import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { RefreshToken } from './types/refresh.token';
import { AccessToken } from './types/accessToken.type';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from 'src/data/repositories/users.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { DEFAULT_CURRENCY } from 'src/constants/default-currency';
import { User } from 'src/db/types';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  public async register(dto: RegisterDto) {
    const { password, email } = dto;
    const user = await this.userRepository.getUserByEmail(email);
    if (user)
      throw new BadRequestException('User with such email already exists');
    const passwordHash = await hash(password, SALT_ROUNDS);
    const newUser = await this.userRepository.createUser({
      ...dto,
      password: passwordHash,
      defaultCurrencyCode: DEFAULT_CURRENCY,
    });
    return newUser;
  }

  async login(payload: LoginDto) {
    const user = await this.userRepository.getUserByEmail(payload.email);
    if (!user) throw new NotFoundException('User not found');
    const isCorrect = await compare(payload.password, user.password);
    if (!isCorrect) throw new UnauthorizedException('Wrong email or password');
    const result = await Promise.all([
      this.generateRefreshToken(user),
      this.generateAccessToken(user),
    ]);
    return result;
  }

  async refresh(refreshToken?: string) {
    if (!refreshToken)
      throw new BadRequestException('No refresh token provided');
    const payload: RefreshToken | AccessToken =
      await this.jwtService.verifyAsync(refreshToken);
    if (payload.type !== 'refresh')
      throw new UnauthorizedException('Invalid refresh token');
    const user = await this.userRepository.getUserById(payload.sub);
    if (!user) throw new NotFoundException('User not found');
    const accessToken = await this.generateAccessToken(user);
    return { accessToken };
  }

  private async generateRefreshToken(user: User): Promise<string> {
    const payload: RefreshToken = { sub: user.id, type: 'refresh' };
    const ttl = this.configService.get<number>('jwt.refreshTtl');
    return await this.jwtService.signAsync(payload, { expiresIn: ttl });
  }

  private async generateAccessToken(user: User): Promise<string> {
    const payload: AccessToken = { sub: user.id, type: 'access' };
    const ttl = this.configService.get<number>('jwt.ttl');
    return await this.jwtService.signAsync(payload, { expiresIn: ttl });
  }
}

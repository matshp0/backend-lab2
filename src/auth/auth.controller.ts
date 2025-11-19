import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Public } from 'src/common/decorators/public';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @Post('/register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('/login')
  async login(@Body() dto: LoginDto, @Res() res: FastifyReply) {
    const [refreshToken, accessToken] = await this.authService.login(dto);
    res.setCookie('refresh_token', refreshToken, {
      httpOnly: true,
      path: '/auth',
      secure: true,
      sameSite: 'strict',
      maxAge: this.configService.get<number>('jwt.refreshTtl')! / 1000,
    });
    return res.send({ accessToken });
  }

  @Public()
  @Get('/refresh')
  async refresh(@Req() req: FastifyRequest) {
    return await this.authService.refresh(req.cookies.refresh_token);
  }
}

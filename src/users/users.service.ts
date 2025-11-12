import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UserRepository } from 'src/data/repositories/users.repository';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  public findUsers(id: string): UserEntity {
    const user = this.userRepository.getUserById(id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  public removeUser(id: string): void {
    const deleted = this.userRepository.deleteUserById(id);
    if (!deleted) throw new NotFoundException(`User with id ${id} not found`);
  }

  public createUser(dto: CreateUserDto) {
    const id = randomUUID();
    return this.userRepository.createUser({ id, ...dto });
  }

  public findAllUsers(): UserEntity[] {
    return this.userRepository.getAll();
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/data/repositories/users.repository';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  public async findUsers(id: string) {
    const user = await this.userRepository.getUserById(id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  public async removeUser(id: string): Promise<void> {
    const deleted = await this.userRepository.deleteUserById(id);
    if (!deleted) throw new NotFoundException(`User with id ${id} not found`);
  }

  public findAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.getAll();
  }
}

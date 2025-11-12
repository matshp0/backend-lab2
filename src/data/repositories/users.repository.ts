import { randomUUID } from 'crypto';
import { UserEntity } from '../entities/user.entity';

export class UserRepository {
  private readonly storage: Map<string, UserEntity>;
  constructor() {
    this.storage = new Map();
  }

  getUserById(id: string): UserEntity | null {
    return this.storage.get(id) || null;
  }

  deleteUserById(id: string): boolean {
    return this.storage.delete(id);
  }

  createUser(user: CreateUserDto): UserEntity {
    const id = randomUUID();
    const newUser = { id, ...user };
    this.storage.set(id, newUser);
    return newUser;
  }

  getAll(): UserEntity[] {
    return Array.from(this.storage.values());
  }
}

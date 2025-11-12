import { UserEntity } from '../../users/entities/user.entity';

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

  createUser(user: UserEntity): UserEntity {
    const newUser = { ...user };
    this.storage.set(user.id, newUser);
    return newUser;
  }

  getAll(): UserEntity[] {
    return Array.from(this.storage.values());
  }
}

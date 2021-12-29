import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UserService {
  private readonly users = [
    {
      id: 1,
      username: 'developer',
      password: 'password^',
    },
    {
      id: 2,
      username: 'cacing69',
      password: '23Cacing09#@',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}

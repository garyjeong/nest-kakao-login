import { Injectable, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guard/jwt.auth.guard';

export type User = any;

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  @UseGuards(JwtAuthGuard)
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}

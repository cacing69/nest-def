import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

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

  async findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'user with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getByUuid(uuid: string) {
    const user = await this.userRepository.findOne({ uuid });
    if (user) {
      return user;
    }
    throw new HttpException(
      'user with this uuid does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return newUser;
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async getAuthenticatedUser(
    email: string,
    plainTextPassword: string,
  ): Promise<any> {
    // console.log('getAuthenticatedUser');
    // const user = await this.userService.getByEmail(email);

    // if (user && user.password === pass) {
    //   const { password, ...result } = user;
    //   return result;
    // }

    // return null;
    try {
      const user = await this.userService.getByEmail(email);
      // console.log(user);
      // const isPasswordMatching = await bcrypt.compare(
      //   plainTextPassword,
      //   user.password,
      // );
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compareSync(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hashSync(registrationData.password, 10);

    try {
      const createdUser = await this.userService.create({
        ...registrationData,
        password: hashedPassword,
      });

      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      // if (error?.code === PostgresErrorCode.UniqueViolation) {
      //   throw new HttpException(
      //     'User with that email already exists',
      //     HttpStatus.BAD_REQUEST,
      //   );
      // }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCookieWithJwtToken(uuid: string) {
    const payload: AuthTokenPayload = { uuid };
    const token = await this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_EXPIRATION_TIME}`;
  }

  getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  // async login(user: User) {
  //   const payload = { uuid: user.uuid };

  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
}

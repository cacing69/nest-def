import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  Res,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { FastifyReply } from 'fastify';

@Controller('auth')
@SerializeOptions({
  strategy: 'excludeAll',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async postLogin(@Request() req, @Res() res: FastifyReply) {
    const user = req.user;

    // return user;
    // console.log(user);
    const cookie = await this.authService.getCookieWithJwtToken(user?.uuid);
    // res.
    // user.password = undefined;
    // return user;
    return res
      .headers({
        'Set-Cookie': cookie,
      })
      .send(user);
    //   return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@Res() res: FastifyReply) {
    const cookie = await this.authService.getCookieForLogOut();
    return res
      .headers({
        'Set-Cookie': cookie,
      })
      .send({});
  }

  @Public()
  @Post('register')
  async postRegister(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

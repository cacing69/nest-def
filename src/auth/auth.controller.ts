import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('token')
  async postToken(@Request() req) {
    return this.authService.login(req.user);
    //   return req.user;
  }

  // curl http://localhost:3000/auth/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRldmVsb3BlciIsInN1YiI6MSwiaWF0IjoxNjQwNzg5NjkyLCJleHAiOjE2NDEzOTQ0OTJ9.WQ_Tb-4GfhYumUILcpErNroodAYdNHFQVeNU5UeNNuw"
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

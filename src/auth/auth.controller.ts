import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get()
  getAuth(): object {
    return {
      route: 'auth',
    };
  }
}

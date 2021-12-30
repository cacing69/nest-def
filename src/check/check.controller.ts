import { Controller, Get, Req, SerializeOptions } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';

@Controller('check')
export class CheckController {
  @Public()
  @Get('public')
  getPublic(): any {
    return {
      public: true,
      private: false,
    };
  }

  @Get('private')
  getPrivate(@Req() req): any {
    return {
      public: false,
      private: true,
    };
  }
}

import { Controller, Get } from '@nestjs/common';
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
  getPrivate(): any {
    return {
      public: false,
      private: true,
    };
  }
}

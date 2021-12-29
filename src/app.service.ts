import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHome(): object {
    return {
      app: 'api',
      ver: '1.0.1',
      env: process.env.NEST_ENV_CHECK || false,
      dev: ['@cacing69'],
    };
  }
}

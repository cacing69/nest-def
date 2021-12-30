import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHome(): object {
    return {
      app: 'api',
      ver: '1.0.1',
      env: {
        nest_env_check: process.env.NEST_ENV_CHECK || null,
      },
      dev: ['@cacing69'],
    };
  }
}

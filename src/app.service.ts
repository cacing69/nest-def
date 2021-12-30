import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHome(): object {
    return {
      app: 'api',
      ver: '1.0.1',
      env: {
        nest_env_check: process.env.NEST_ENV_CHECK || null,
        db_host: process.env.DATABASE_HOST || null,
        jwt_secret: process.env.JWT_SECRET || null,
        jwt_public_key: process.env.JWT_PUBLIC_KEY || null,
        jwt_private_key: process.env.JWT_PRIVATE_KEY || null,
      },
      dev: ['@cacing69'],
    };
  }
}

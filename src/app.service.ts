import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHome(): any {
    return { app: 'api', version: '1.0.1', env: process.env.ENV_CHECK };
  }
}

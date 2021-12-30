import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';
import { Repository } from 'typeorm';
import { AuthService } from '../auth.service';

const authService = new AuthService(
  new UserService(new Repository<User>()),
  new JwtService({
    secret: 'b47e2f7967a5940199215e060175b63c3774991bb14681cd9cebb9247ab87711',
  }),
);

describe('when creating a cookie', () => {
  it('should return a string', async () => {
    const uuid = '7239f550-7798-4c47-8cea-a343a1a18f88';
    expect(typeof (await authService.getCookieWithJwtToken(uuid))).toEqual(
      'string',
    );
  });
});

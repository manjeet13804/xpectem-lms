import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AccessControlModule } from 'nest-access-control';
import * as request from 'supertest';
import { roles } from './../../src/app.roles';
import { UserService } from './../../src/modules/user/user.service';
import { PassportModule } from '@nestjs/passport';

describe('Auth', () => {
  let app: INestApplication;
  const authService = {
    signin: () => ({
      id: 1,
      roles: 'user',
      token: 'qwefvddfwegfvw',
    }),
    signup: () => ['example@example.example', 'password'],
  };
  const userService = {
    isUserExists: () => false,
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        AccessControlModule.forRoles(roles),
      ],
    })
      .overrideProvider(UserService)
      .useValue(userService)
      .compile();

    app = await module.createNestApplication().init();
  });

  describe('Authentication', () => {
    describe('User registration', () => {
      it('/POST auth/signup', () =>
        request(app.getHttpServer())
          .post('/auth/signup')
          .set('Accept', 'application/json')
          .expect(authService.signup));
    });

    describe('User login', () => {
      it('/POST auth/signin', () =>
        request(app.getHttpServer())
          .post('/auth/signin')
          .set('Accept', 'application/json')
          .expect(authService.signin));
    });
  });

  afterAll(async () => {
    await app.close();
  });
});

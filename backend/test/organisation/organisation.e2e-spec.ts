import { OrganisationService } from './../../src/modules/organisation/organisation.service';
import { roles } from './../../src/app.roles';
import { AccessControlModule } from 'nest-access-control';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

describe('Organisation', () => {
  let app: INestApplication;
  const organisationService = {
    create: () => true,
    getAll: () => ([
      {
        id:1,
        name: 'test',
      },
    ]),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AccessControlModule.forRoles(roles)],
    })
      .overrideProvider(OrganisationService)
      .useValue(organisationService)
      .compile();

    app = await module.createNestApplication().init();
  });

  describe('Get all organisations', () => {
    it('/GET organisation', () =>
      request(app.getHttpServer())
        .get('/organisation')
        .set('Accept', 'application/json')
        .expect(organisationService.getAll));
  });

  describe('Create organisation', () => {
    it('/POST organisation', () =>
      request(app.getHttpServer())
        .post('/organisation')
        .set('Accept', 'application/json')
        .expect(organisationService.create));
  });

  afterAll(async () => {
    await app.close();
  });
});

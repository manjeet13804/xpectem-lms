import { AccessControlModule } from 'nest-access-control';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { roles } from './../../src/app.roles';
import { UploadService } from '../../src/modules/upload/upload.service';

describe('File management', () => {
  let app: INestApplication;
  const uploadService = {
    upload: () => ({ url: 'https://test.com/test' }),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        AccessControlModule.forRoles(roles),
      ],
    })
      .overrideProvider(UploadService)
      .useValue(uploadService)
      .compile();

    app = await module.createNestApplication().init();
  });

  describe('Upload file', () => {
    it('/POST file/upload', () =>
      request(app.getHttpServer())
        .post('/file/upload')
        .set('Accept', 'multipart/form-data')
        .expect(uploadService.upload));
  });

  afterAll(async () => {
    await app.close();
  });
});

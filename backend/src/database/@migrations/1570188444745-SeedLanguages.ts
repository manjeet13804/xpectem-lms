import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import { languagesSeed } from '../seeds/LanguagesSeed';

export class SeedLanguages1570188444745 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await getRepository('language').save(languagesSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
  }

}

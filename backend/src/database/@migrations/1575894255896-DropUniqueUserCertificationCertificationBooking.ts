import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropUniqueUserCertificationCertificationBooking1575894255896 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP INDEX `IDX_ae63152112ff9b96be2fac3eef` ON `certification_booking`');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE UNIQUE INDEX `IDX_ae63152112ff9b96be2fac3eef` ON `certification_booking` (`user_id`, `certification_id`)');
  }
}

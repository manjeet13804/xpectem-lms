import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class AddTriggerDeleteEmailsPhones1574954450445 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE TRIGGER delete_emails_phones BEFORE DELETE ON user FOR EACH ROW BEGIN DELETE FROM user_email WHERE user_id = OLD.id; DELETE FROM user_email WHERE user_id = OLD.id; END');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TRIGGER delete_emails_phones');
  }
}

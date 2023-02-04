import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class AddTriggerDeleteUserData1575027063840 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TRIGGER delete_emails_phones');
    await queryRunner.query("CREATE TRIGGER delete_user_data BEFORE DELETE ON user FOR EACH ROW BEGIN DELETE FROM user_email WHERE user_id = OLD.id; DELETE FROM user_phone WHERE user_id = OLD.id; UPDATE user_log SET created_by_id = (SELECT id FROM user WHERE roles = 'xpectum' LIMIT 1) WHERE created_by_id = OLD.id; UPDATE user_log SET changed_by_id = (SELECT id FROM user WHERE roles = 'xpectum' LIMIT 1) WHERE changed_by_id = OLD.id; END");
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TRIGGER delete_user_data');
    await queryRunner.query(`CREATE TRIGGER delete_emails_phones
                                    BEFORE DELETE ON user FOR EACH ROW
                                    BEGIN
                                      DELETE FROM user_email WHERE user_id = OLD.id;
                                      DELETE FROM user_email WHERE user_id = OLD.id;
                                    END`);
  }

}

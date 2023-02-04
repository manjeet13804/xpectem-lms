import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class AddNotesUsers1574420937407 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE TABLE IF NOT EXISTS `notes_users` (`id` int NOT NULL AUTO_INCREMENT, `text` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('ALTER TABLE `user` ADD `note_user_id` int NULL');
    await queryRunner.query('ALTER TABLE `user` ADD UNIQUE INDEX `IDX_6595751ffb8e1f968857d7ba43` (`note_user_id`)');
    await queryRunner.query('CREATE UNIQUE INDEX `REL_6595751ffb8e1f968857d7ba43` ON `user` (`note_user_id`)');
    await queryRunner.query('ALTER TABLE `user` ADD CONSTRAINT `FK_6595751ffb8e1f968857d7ba436` FOREIGN KEY (`note_user_id`) REFERENCES `notes_users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("ALTER TABLE 'user' DROP FOREIGN KEY 'FK_6595751ffb8e1f968857d7ba436'");
    await queryRunner.query("DROP INDEX 'REL_6595751ffb8e1f968857d7ba43' ON 'user'");
    await queryRunner.query("ALTER TABLE 'user' DROP INDEX 'IDX_6595751ffb8e1f968857d7ba43'");
    await queryRunner.query("ALTER TABLE 'user' DROP COLUMN 'note_user_id'");
    await queryRunner.query("DROP TABLE 'notes_users'");
  }

}

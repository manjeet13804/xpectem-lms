import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class AddCertification1562135381523 implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE TABLE `certification` (`id` int NOT NULL AUTO_INCREMENT, `city` varchar(255) NOT NULL, `street` varchar(255) NULL, `zip` int NULL, `start_at` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `certification_booking` (`id` int NOT NULL AUTO_INCREMENT, `user_id` int NULL, `course_id` int NULL, `certification_id` int NULL, UNIQUE INDEX `IDX_ae63152112ff9b96be2fac3eef` (`user_id`, `certification_id`), UNIQUE INDEX `IDX_5b8be042877af855ccc6568212` (`user_id`, `course_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('ALTER TABLE `certification_booking` ADD CONSTRAINT `FK_c35f3c4149828aa6f3abb960f7c` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `certification_booking` ADD CONSTRAINT `FK_4f2f2785f6e9f4b2bae20436697` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `certification_booking` ADD CONSTRAINT `FK_c867f8417e8f77ce5b2c7883b5d` FOREIGN KEY (`certification_id`) REFERENCES `certification`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `certification_booking` DROP FOREIGN KEY `FK_c867f8417e8f77ce5b2c7883b5d`');
    await queryRunner.query('ALTER TABLE `certification_booking` DROP FOREIGN KEY `FK_4f2f2785f6e9f4b2bae20436697`');
    await queryRunner.query('ALTER TABLE `certification_booking` DROP FOREIGN KEY `FK_c35f3c4149828aa6f3abb960f7c`');
    await queryRunner.query('DROP INDEX `IDX_5b8be042877af855ccc6568212` ON `certification_booking`');
    await queryRunner.query('DROP INDEX `IDX_ae63152112ff9b96be2fac3eef` ON `certification_booking`');
    await queryRunner.query('DROP TABLE `certification_booking`');
    await queryRunner.query('DROP TABLE `certification`');
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class AddFaq1562162730216 implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("CREATE TABLE `faq` (`id` int NOT NULL AUTO_INCREMENT, `type` enum ('general', 'course') NOT NULL, `course_id` int NULL, UNIQUE INDEX `REL_b811639973524c79a0371caa91` (`course_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    await queryRunner.query('CREATE TABLE `faq_topic` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `faq_question` (`id` int NOT NULL AUTO_INCREMENT, `question` text NOT NULL, `answer` text NOT NULL, `topic_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `faq_to_topic` (`faq_id` int NOT NULL, `faq_topic_id` int NOT NULL, INDEX `IDX_e75a1f9d701c98979d88edbd35` (`faq_id`), INDEX `IDX_cb6bbd43a9002d32efc3c5dcf9` (`faq_topic_id`), PRIMARY KEY (`faq_id`, `faq_topic_id`)) ENGINE=InnoDB');
    await queryRunner.query('ALTER TABLE `faq` ADD CONSTRAINT `FK_b811639973524c79a0371caa914` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `faq_question` ADD CONSTRAINT `FK_039aa6b75cc767a2629f84e8d27` FOREIGN KEY (`topic_id`) REFERENCES `faq_topic`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('CREATE FULLTEXT INDEX `IDX_3bde5c6e09f09c744e1ed127f9` ON `faq_question` (`question`, `answer`)');
    await queryRunner.query('ALTER TABLE `faq_to_topic` ADD CONSTRAINT `FK_e75a1f9d701c98979d88edbd35a` FOREIGN KEY (`faq_id`) REFERENCES `faq`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `faq_to_topic` ADD CONSTRAINT `FK_cb6bbd43a9002d32efc3c5dcf99` FOREIGN KEY (`faq_topic_id`) REFERENCES `faq_topic`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `faq_to_topic` DROP FOREIGN KEY `FK_cb6bbd43a9002d32efc3c5dcf99`');
    await queryRunner.query('ALTER TABLE `faq_to_topic` DROP FOREIGN KEY `FK_e75a1f9d701c98979d88edbd35a`');
    await queryRunner.query('ALTER TABLE `faq_question` DROP FOREIGN KEY `FK_039aa6b75cc767a2629f84e8d27`');
    await queryRunner.query('DROP INDEX `IDX_3bde5c6e09f09c744e1ed127f9` ON `faq_question`');
    await queryRunner.query('ALTER TABLE `faq` DROP FOREIGN KEY `FK_b811639973524c79a0371caa914`');
    await queryRunner.query('DROP INDEX `IDX_cb6bbd43a9002d32efc3c5dcf9` ON `faq_to_topic`');
    await queryRunner.query('DROP INDEX `IDX_e75a1f9d701c98979d88edbd35` ON `faq_to_topic`');
    await queryRunner.query('DROP TABLE `faq_to_topic`');
    await queryRunner.query('DROP TABLE `faq_question`');
    await queryRunner.query('DROP TABLE `faq_topic`');
    await queryRunner.query('DROP INDEX `REL_b811639973524c79a0371caa91` ON `faq`');
    await queryRunner.query('DROP TABLE `faq`');
  }
}

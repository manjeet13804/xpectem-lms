import {MigrationInterface, QueryRunner} from "typeorm";

export class RegenerateTaxonomy1617966445681 implements MigrationInterface {
    name = 'RegenerateTaxonomy1617966445681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `taxonomy` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `format` varchar(255) NOT NULL, `mandatory` tinyint NOT NULL, `lms_group_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `student_taxonomy` (`id` int NOT NULL AUTO_INCREMENT, `value` varchar(255) NOT NULL, `user_id` int NULL, `taxonomy_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `taxonomy` ADD CONSTRAINT `FK_17e094de26cb79baaf86ecf33f7` FOREIGN KEY (`lms_group_id`) REFERENCES `lms_group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `student_taxonomy` ADD CONSTRAINT `FK_54753b8e2eb53a60123102c7ff8` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `student_taxonomy` ADD CONSTRAINT `FK_0f5222d3001ddab55912f1c8734` FOREIGN KEY (`taxonomy_id`) REFERENCES `taxonomy`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
    }
​
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `student_taxonomy` DROP FOREIGN KEY `FK_0f5222d3001ddab55912f1c8734`");
        await queryRunner.query("ALTER TABLE `student_taxonomy` DROP FOREIGN KEY `FK_54753b8e2eb53a60123102c7ff8`");
        await queryRunner.query("ALTER TABLE `taxonomy` DROP FOREIGN KEY `FK_17e094de26cb79baaf86ecf33f7`");
        await queryRunner.query("DROP TABLE `student_taxonomy`");
        await queryRunner.query("DROP TABLE `taxonomy`");
    }
​
}

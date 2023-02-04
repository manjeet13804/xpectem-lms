import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTutorIdToFiles1604314973292 implements MigrationInterface {
    name = 'AddTutorIdToFiles1604314973292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tutor_file` ADD `tutor_id` int NULL");
        await queryRunner.query("ALTER TABLE `tutor_file` ADD CONSTRAINT `FK_bac6a2005d8a5927973e35dfeef` FOREIGN KEY (`tutor_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tutor_file` DROP FOREIGN KEY `FK_bac6a2005d8a5927973e35dfeef`");
        await queryRunner.query("ALTER TABLE `tutor_file` DROP COLUMN `tutor_id`");
    }

}

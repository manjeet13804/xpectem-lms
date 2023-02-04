import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNoteToUser1622230089310 implements MigrationInterface {
    name = 'AddNoteToUser1622230089310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `note` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `note`");
    }

}

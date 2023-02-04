import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeTaxonomyFromRequired1618402453986 implements MigrationInterface {
    name = 'ChangeTaxonomyFromRequired1618402453986'
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `taxonomy` MODIFY `format` VARCHAR(255) NULL;");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `taxonomy` MODIFY `format` VARCHAR(255) NOT NULL;");
    }

}

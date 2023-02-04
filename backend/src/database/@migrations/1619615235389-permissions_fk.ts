import {MigrationInterface, QueryRunner} from "typeorm";

export class permissionsFk1619615235389 implements MigrationInterface {
    name = 'permissionsFk1619615235389'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO permission (type)
            VALUES
            ('No access'),
            ('Access'),
            ('Access & Edit');
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("truncate permission")
    }

}

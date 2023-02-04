import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteUniqueIndexOfTaxanomy1614781937571 implements MigrationInterface {
    name = 'DeleteUniqueIndexOfTaxanomy1614781937571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_76d10e2448c9718bda6d580cdf` ON `user`");
        await queryRunner.query("DROP INDEX `IDX_f74df4b59595d4ecd5e687f6e5` ON `user`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_f74df4b59595d4ecd5e687f6e5` ON `user` (`employee_number`)");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_76d10e2448c9718bda6d580cdf` ON `user` (`person_number`)");
    }

}

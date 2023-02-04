import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateRoleColumnUserTable1616056815959 implements MigrationInterface {
    name = 'UpdateRoleColumnUserTable1616056815959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` MODIFY `roles` set('xpectum', 'course_creator', 'super_admin', 'admin', 'admin_lms', 'admin_organisation', 'admin_group', 'tutor', 'editor', 'user', 'outer_api') NOT NULL DEFAULT 'user'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` MODIFY `roles` enum ('xpectum', 'course_creator', 'super_admin', 'admin', 'admin_lms', 'admin_organisation', 'admin_group', 'tutor', 'editor', 'user', 'outer_api') NOT NULL DEFAULT 'user'");
    }

}

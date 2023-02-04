import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserRolesEnumOuterApi1573212957909 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
        'ALTER TABLE `user` CHANGE `roles` `roles` enum ' +
        "('xpectum', 'course_creator', 'super_admin', 'admin', 'admin_lms', 'admin_organisation', " +
        "'admin_group', 'tutor', 'editor', 'user', 'outer_api') NOT NULL DEFAULT 'user'");
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
        'ALTER TABLE `user` CHANGE `roles` `roles` enum ' +
        "('xpectum', 'course_creator', 'super_admin', 'admin', 'admin_lms', 'admin_organisation', " +
        "'admin_group', 'tutor', 'editor', 'user') NOT NULL DEFAULT 'user'");
  }
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class InserRoles1714800431167 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO role
            VALUES
            (null, 'VOLUNTARIO'),
            (null, 'VOLUNTARIO_ADMIN'),
            (null, 'ADMIN')`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM role
            WHERE title IN ('USER','APPROVER', 'ADMIN')
            LIMIT 3`
        );
    }

}

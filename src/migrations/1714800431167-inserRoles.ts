import { MigrationInterface, QueryRunner } from "typeorm";

export class InserRoles1714800431167 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_4a74ca47fe1aa34a28a6db3c72\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(
            `INSERT INTO role
            VALUES
            (null, 'VOLUNTARIO'),
            (null, 'VOLUNTARIO_ADMIN'),
            (null, 'ADMIN'),
            (null, 'INTITUITION')`
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

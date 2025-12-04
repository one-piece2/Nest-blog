import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1764856960705 implements MigrationInterface {
    name = ' $npmConfigName1764856960705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag" ADD "createAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "createAt"`);
    }

}

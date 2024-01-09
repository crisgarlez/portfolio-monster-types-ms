import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMonsterTypesTable1704382050419 implements MigrationInterface {
    name = 'AddMonsterTypesTable1704382050419'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "monster_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "name" character varying NOT NULL, "key" character varying NOT NULL, "incubation_time" integer, CONSTRAINT "PK_7e46dd888f1372e6e7cc461cea6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "monster_types"`);
    }

}

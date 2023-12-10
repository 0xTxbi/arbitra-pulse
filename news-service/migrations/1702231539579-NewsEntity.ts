import { MigrationInterface, QueryRunner } from "typeorm";

export class NewsEntity1702231539579 implements MigrationInterface {
    name = 'NewsEntity1702231539579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "news" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "link" character varying NOT NULL, "publisher" text NOT NULL, "description" character varying NOT NULL, "imageUrl" character varying NOT NULL, "content" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL, CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "news"`);
    }

}

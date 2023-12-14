import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrationsc1702404205332 implements MigrationInterface {
    name = 'Migrationsc1702404205332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sentiment_result" ("id" SERIAL NOT NULL, "stockSymbol" character varying NOT NULL, "sentiment" character varying NOT NULL, "confidence" integer NOT NULL, "currentStockPrice" integer, "priceChange" integer, "percentageChange" integer, CONSTRAINT "PK_86c8d740551a9efe751cbca494f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "news" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "link" character varying NOT NULL, "publisher" text NOT NULL, "description" character varying NOT NULL, "imageUrl" character varying NOT NULL, "content" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL, CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "news"`);
        await queryRunner.query(`DROP TABLE "sentiment_result"`);
    }

}

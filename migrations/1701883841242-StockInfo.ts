import { MigrationInterface, QueryRunner } from "typeorm";

export class StockInfo1701883841242 implements MigrationInterface {
    name = 'StockInfo1701883841242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stock_info" ("symbol" character varying NOT NULL, "companyName" character varying NOT NULL, "currentPrice" integer NOT NULL, "industry" character varying NOT NULL, "marketCap" character varying NOT NULL, "changePercent" integer, "volume" integer, "peRatio" integer, CONSTRAINT "PK_e070ed33681787dcb207b8a0b22" PRIMARY KEY ("symbol"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "stock_info"`);
    }

}

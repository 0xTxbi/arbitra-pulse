import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRefactor1701830533077 implements MigrationInterface {
    name = 'UserRefactor1701830533077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "salt" character varying NOT NULL, "hashedPassword" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "news_data" ("id" SERIAL NOT NULL, "headline" character varying NOT NULL, "content" character varying NOT NULL, "publicationDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_c50f8b73475aae5d076e3b7e129" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sentiment_data" ("id" SERIAL NOT NULL, "stockSymbol" character varying NOT NULL, "sentimentScore" integer NOT NULL, CONSTRAINT "PK_b4a89349412d867c27149768a97" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stock" ("id" SERIAL NOT NULL, "symbol" character varying NOT NULL, "companyName" character varying NOT NULL, CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "stock"`);
        await queryRunner.query(`DROP TABLE "sentiment_data"`);
        await queryRunner.query(`DROP TABLE "news_data"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}

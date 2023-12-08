import { MigrationInterface, QueryRunner } from "typeorm";

export class Watchlist1702049386067 implements MigrationInterface {
    name = 'Watchlist1702049386067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "watchlist" ("id" SERIAL NOT NULL, "symbol" character varying NOT NULL, "user_id" integer, CONSTRAINT "PK_0c8c0dbcc8d379117138e71ad5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "watchlist" ADD CONSTRAINT "FK_116b3a91612f008beb96bfd5742" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "watchlist" DROP CONSTRAINT "FK_116b3a91612f008beb96bfd5742"`);
        await queryRunner.query(`DROP TABLE "watchlist"`);
    }

}

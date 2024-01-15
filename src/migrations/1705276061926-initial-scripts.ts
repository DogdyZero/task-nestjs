import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialScripts1705276061926 implements MigrationInterface {
    name = 'InitialScripts1705276061926'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "deadline" TIMESTAMP NOT NULL, "duration" integer NOT NULL, "finished" boolean NOT NULL, "departament_id" uuid, "employee_id" uuid, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "departament" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_421574e32347465bd3d720c55cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "departament_id" uuid, "user_id" uuid, CONSTRAINT "REL_f61258e58ed35475ce1dba0379" UNIQUE ("user_id"), CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_21b6ba4c27d1b00fe5cb1e64865" FOREIGN KEY ("departament_id") REFERENCES "departament"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_a198e46a9402f905c8c2fc37c25" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_126b2e591b900a89c2a11a20478" FOREIGN KEY ("departament_id") REFERENCES "departament"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_f61258e58ed35475ce1dba03797" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_f61258e58ed35475ce1dba03797"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_126b2e591b900a89c2a11a20478"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_a198e46a9402f905c8c2fc37c25"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_21b6ba4c27d1b00fe5cb1e64865"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "departament"`);
        await queryRunner.query(`DROP TABLE "task"`);
    }

}

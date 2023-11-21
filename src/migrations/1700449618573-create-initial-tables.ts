import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTables1700449618573 implements MigrationInterface {
    name = 'CreateInitialTables1700449618573'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE seq_employee`);
        await queryRunner.query(`CREATE SEQUENCE seq_task`);
        await queryRunner.query(`CREATE SEQUENCE seq_departament`);
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "deadline" TIMESTAMP NOT NULL, "duration" integer NOT NULL, "finished" boolean NOT NULL, "departament_id" integer, "employee_id" integer, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "departament_id" integer, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "departament" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_421574e32347465bd3d720c55cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_21b6ba4c27d1b00fe5cb1e64865" FOREIGN KEY ("departament_id") REFERENCES "departament"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_a198e46a9402f905c8c2fc37c25" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_126b2e591b900a89c2a11a20478" FOREIGN KEY ("departament_id") REFERENCES "departament"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "id" SET DEFAULT nextval('seq_task')`)
        await queryRunner.query(`ALTER TABLE "departament" ALTER COLUMN "id" SET DEFAULT nextval('seq_departament')`)
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "id" SET DEFAULT nextval('seq_employee')`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_126b2e591b900a89c2a11a20478"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_a198e46a9402f905c8c2fc37c25"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_21b6ba4c27d1b00fe5cb1e64865"`);
        await queryRunner.query(`DROP TABLE "departament"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP SEQUENCE seq_employee`);
        await queryRunner.query(`DROP SEQUENCE seq_task`);
        await queryRunner.query(`DROP SEQUENCE seq_departament`);
    }

}

import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateQuestions1593002474602 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        return await queryRunner.createTable(
            new Table({
              name: 'questions',
              columns: [
                {
                  name: 'id',
                  type: 'bigint',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'ques',
                  type: 'varchar',
                },
                {
                  name:'survey_id',
                  type: 'bigint',
                },
              ],
            }),
            true,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "questions"`);
    }

}

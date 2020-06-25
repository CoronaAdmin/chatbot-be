import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAnswers1593086369384 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.createTable(
            new Table({
              name: 'answers',
              columns: [
                {
                  name: 'id',
                  type: 'bigint',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'user_id',
                  type: 'bigint',
                },
                {
                  name:'response',
                  type: 'jsonb',
                  isNullable: true,
                },
              ],
            }),
            true,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "answers"`);
    }

}

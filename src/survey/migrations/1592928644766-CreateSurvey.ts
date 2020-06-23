import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurvey1592928644766 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        return await queryRunner.createTable(
            new Table({
              name: 'survey',
              columns: [
                {
                  name: 'id',
                  type: 'bigint',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'name',
                  type: 'varchar',
                },
                {
                  name: 'createdAt',
                  type: 'timestamp',
                  default: 'CURRENT_TIMESTAMP',
                  isNullable: false,
                },
                {
                  name: 'updatedAt',
                  type: 'timestamp',
                  default: 'CURRENT_TIMESTAMP',
                  isNullable: false,
                },
              ],
            }),
            true,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "survey"`);
    }

}

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Users1703347506016 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'uuid',
            type: 'varchar',
            length: '145',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
            length: '200',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '145',
            isNullable: false,
          },
          {
            name: 'password',
            isNullable: false,
            type: 'text',
          },
          {
            name: 'role',
            type: 'enum',
            enum: ['admin', 'borrower'],
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'updated_at',
            type: 'date',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}

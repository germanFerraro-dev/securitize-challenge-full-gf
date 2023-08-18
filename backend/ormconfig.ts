import { DataSource } from 'typeorm';

export const connectionSource = new DataSource({
  type: 'postgres',
  host: 'secu-dev-db',
  port: 5432,
  username: 'admin',
  password: '1234',
  database: 'secu-db',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsTableName: 'migrations',
  migrations: ['src/database/migrations/*.ts'],
  //   cli: {
  //     migrationsDir: 'src/database/migrations',
  //   },
});

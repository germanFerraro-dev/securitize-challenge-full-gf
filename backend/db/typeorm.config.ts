import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

export const connectionSource = new DataSource({
  type: 'postgres',
  host: 'secu-dev-db',
  port: 5432,
  username: 'admin',
  password: '1234',
  database: 'secu-db',
  entities: ['src/**/*.entity{.ts,.js}'],
  synchronize: true,
  migrationsTableName: 'migrations',
  migrations: [`db/migrations/*{.ts,.js}`],
});

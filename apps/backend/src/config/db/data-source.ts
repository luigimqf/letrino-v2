import { DataSource } from 'typeorm';
import { env } from '../enviroment';

const isProduction = env.NODE_ENV === 'production';
const fileExtension = isProduction ? 'js' : 'ts';
const dir = isProduction ? 'dist' : 'src';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: isProduction ? env.DB_URL_PROD : env.DB_URL_LOCAL,
  synchronize: !isProduction,
  logging: !isProduction,
  entities: [`${dir}/config/db/entity/*.${fileExtension}`],
  migrations: [`${dir}/config/db/migrations/*.${fileExtension}`],
  subscribers: [`${dir}/config/db/subscribers/*.${fileExtension}`],
  ssl: env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
  extra: {
    timezone: 'UTC',
  },
});

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user',
  password: 'password',
  database: 'database',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  //作用：自动同步实体与数据库的结构
  synchronize: true,
};

export default config;

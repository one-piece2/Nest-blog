import { PostgresConnectionOptions} from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { join } from 'path';
import { Tag } from './tag/entities/tag.entity';
import { User } from './user/entities/user.entity';
import { DataSource } from 'typeorm';
const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'blog',
  entities: [Tag, User],
  //作用：自动同步实体与数据库的结构
  // synchronize: true,
  migrationsTableName: 'migrations',
  migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
  migrationsRun: true,
};

const AppDataSource = new DataSource(config);
export { AppDataSource };

export default config;

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagModule } from './tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import config from './ormcofig';
import { ConfigModule } from '@nestjs/config';
@Module({
  //配置了ConfigModule，isGlobal:true表示全局可用，他的作用是将配置文件中的环境变量加载到全局，可以在任何地方使用process.env.变量名来访问环境变量
  imports: [TagModule, TypeOrmModule.forRoot(config), UserModule,ConfigModule.forRoot({isGlobal:true})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

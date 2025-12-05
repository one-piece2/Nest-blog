import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthMiddleware } from './Middlewares/auth.middleware';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController,],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule  implements NestModule{
  // 配置中间件
  configure(consumer: MiddlewareConsumer) {
    // 对所有路由应用 AuthMiddleware
  consumer.apply(AuthMiddleware).forRoutes({path:'*',method:RequestMethod.ALL})
  }
}

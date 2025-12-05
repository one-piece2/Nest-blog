import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes ,ValidationPipe, Req} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserResponse } from './types/userResponse.interface';
import { LoginUserDto } from './dto/login-user.dto';

import { User } from './entities/user.entity';
import { User as UserDecorator } from './decorators/user.decorator';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}


@UsePipes(new ValidationPipe())
  @Post('users')
  async create(@Body('user') createUserDto: CreateUserDto): Promise<IUserResponse> {
    return await this.userService.createUser(createUserDto);
  }


@UsePipes(new ValidationPipe())
   @Post('users/login')
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<IUserResponse> {
    const user=await this.userService.loginUser(loginUserDto);
    return this.userService.gennerateUserResponse(user);
  }
 
@Get('user')
async getCurrentUser(@UserDecorator() user:User): Promise<IUserResponse> {
 
  return this.userService.gennerateUserResponse(user);
}

}

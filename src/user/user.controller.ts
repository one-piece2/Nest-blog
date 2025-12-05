import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes ,ValidationPipe, Req, UseGuards, Put} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserResponse } from './types/userResponse.interface';
import { LoginUserDto } from './dto/login-user.dto';

import { User } from './entities/user.entity';
import { User as UserDecorator } from './decorators/user.decorator';
import { AuthGuard } from './guards/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

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
@UseGuards(AuthGuard)
async getCurrentUser(@UserDecorator() user:User): Promise<IUserResponse> {
 
  return this.userService.gennerateUserResponse(user);
}
 

@Put('user')
@UseGuards(AuthGuard)
async updateCurrentUser(@UserDecorator('id') id:number ,@Body('user') updateUserDto: UpdateUserDto): Promise<IUserResponse> {
  return await this.userService.updateUser(id, updateUserDto);
}

}

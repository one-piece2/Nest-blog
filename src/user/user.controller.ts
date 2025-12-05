import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes ,ValidationPipe, Req} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserResponse } from './types/userResponse.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { type AuthRequest } from '@/types/expressRequest.interface';

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
async getCurrentUser(@Req() request:AuthRequest): Promise<any> {
  console.log(request.user);
  return this.userService.gennerateUserResponse(request.user);
}

}

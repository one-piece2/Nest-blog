import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes ,ValidationPipe} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserResponse } from './types/userResponse.interface';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


@UsePipes(new ValidationPipe())
  @Post()
  async create(@Body('user') createUserDto: CreateUserDto): Promise<IUserResponse> {
    return await this.userService.createUser(createUserDto);
  }

  
@UsePipes(new ValidationPipe())
   @Post('login')
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<IUserResponse> {
    const user=await this.userService.loginUser(loginUserDto);
    return this.userService.gennerateUserResponse(user);
  }
 
}

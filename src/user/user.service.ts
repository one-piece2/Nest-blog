import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { IUserResponse } from './types/userResponse.interface';
import { sign, verify } from 'jsonwebtoken';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async createUser(createUserDto: CreateUserDto): Promise<IUserResponse> {
    const newUser = new User();
    Object.assign(newUser, createUserDto);
   const userByEmail = await this.userRepository.findOne({where:{email:createUserDto.email}});
    
    const userByUsername = await this.userRepository.findOne({where:{username:createUserDto.username}});
   if(userByEmail||userByUsername){
    throw new HttpException('用户名或邮箱已存在',HttpStatus.UNPROCESSABLE_ENTITY);
   }
    const savedUser = await this.userRepository.save(newUser);
    return this.gennerateUserResponse(savedUser);
  }

  generateToken(user: User): string {
    const token = sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET);
    // 解码token 必须使用前面对应的密匙：“234234dfgdfg”
    // const decodedToken = verify(token, '234234dfgdfg');

    return token;
  }

  gennerateUserResponse(user: User): IUserResponse {
    return {
      user: {
        ...user,
        token: this.generateToken(user)
      }
    };
  }
}

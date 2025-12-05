import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { IUserResponse } from './types/userResponse.interface';
import { sign, verify } from 'jsonwebtoken';
import { LoginUserDto } from './dto/login-user.dto';
import { compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async createUser(createUserDto: CreateUserDto): Promise<IUserResponse> {
    const newUser = new User();
    Object.assign(newUser, createUserDto);
    const userByEmail = await this.userRepository.findOne({ where: { email: createUserDto.email } });

    const userByUsername = await this.userRepository.findOne({ where: { username: createUserDto.username } });
    if (userByEmail || userByUsername) {
      throw new HttpException('用户名或邮箱已存在', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const savedUser = await this.userRepository.save(newUser);
    return this.gennerateUserResponse(savedUser);
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email: loginUserDto.email } });
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    //由于密码是加密存储的，所以需要使用compare方法比较密码是否正确
    const isPasswordValid = await compare(loginUserDto.password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('密码错误', HttpStatus.UNAUTHORIZED);
    }
    //如果密码正确，返回用户信息 但是不包含密码
    delete user.password;
    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  generateToken(user: User): string {
    const token = sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET);
    // 解码token 必须使用前面对应的密匙：“234234dfgdfg”
    // const decodedToken = verify(token, '234234dfgdfg');

    return token;
  }

  gennerateUserResponse(user: User): IUserResponse {
    // if (!user.id) {
    //   throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    // }
    return {
      user: {
        ...user,
        token: this.generateToken(user)
      }
    };
  }
}

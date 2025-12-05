
import { NestMiddleware ,Injectable} from "@nestjs/common";
import { UserService } from "../user.service";
import { NextFunction } from "express";
import {verify} from 'jsonwebtoken'
import { AuthRequest } from '../../types/expressRequest.interface';
import { User } from "../entities/user.entity";




@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req:AuthRequest,res:Response,next:NextFunction){
    if(!req.headers.authorization){
     req.user=new User()
     next()
      return
    }
   const token=req.headers.authorization.split(' ')[1]
   try{
    //作用：验证token是否有效 decode返回token中的payload
     const decode=verify(token,process.env.JWT_SECRET) 
     console.log(decode)
     const user=await this.userService.findById(decode.id)
      req.user=user
     next()
   }catch(err){
    req.user=new User()
  next()
   }

  }
}
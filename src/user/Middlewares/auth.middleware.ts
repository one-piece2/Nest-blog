
import { NestMiddleware ,Injectable} from "@nestjs/common";
import { UserService } from "../user.service";
import { NextFunction } from "express";






@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req:Request,res:Response,next:NextFunction){

  }
}
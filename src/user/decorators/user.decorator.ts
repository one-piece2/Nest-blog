import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { AuthRequest } from "@/types/expressRequest.interface"


//参数装饰器
//data是使用装饰器的时候传递的参数 比如@User('email') email: string;  表示只要获取email属性
export const User=createParamDecorator((data:any,context:ExecutionContext)=>{
const req=context.switchToHttp().getRequest<AuthRequest>()
const user=req.user
if(user){
  return user
}
if(data){
  return user[data]
}
return null

})
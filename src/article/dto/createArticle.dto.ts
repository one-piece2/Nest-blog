import { IsArray, IsNotEmpty } from "class-validator";
import { IsString } from "class-validator";


export class CreateArticleDto {

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  body: string;
  @IsArray()
  //每个元素都必须是字符串
  @IsString({each:true})
  tagList?: string[];
}
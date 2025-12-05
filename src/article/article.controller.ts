import { Body, Controller, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { User as DecoratedUser } from '@/user/decorators/user.decorator';
import { CreateArticleDto } from './dto/createArticle.dto';
import { User } from '@/user/entities/user.entity';
import { ArticleEntity } from './entities/article.entity';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}


  @Post()
 async createArticle(@DecoratedUser() user: User, @Body('article') createArticleDto: CreateArticleDto): Promise<ArticleEntity>  {
    return await this.articleService.createArticle(user, createArticleDto);
  }
}

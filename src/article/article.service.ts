import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/createArticle.dto';
import { User } from '@/user/entities/user.entity';
import { ArticleEntity } from './entities/article.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArticleService {
constructor(@InjectRepository(ArticleEntity) private readonly articleRepository: Repository<ArticleEntity>) {}

async createArticle(user: User, createArticleDto: CreateArticleDto): Promise<ArticleEntity> {

    const article = new ArticleEntity();

  if(!createArticleDto.tagList) {
    createArticleDto.tagList = [];
  }
Object.assign(article, createArticleDto);
    //article.author = user的作用是将文章的作者设置为当前登录用户 会自动关联到User实体的articles字段 并且外键authorId会被设置为当前用户的id
    article.author = user;
    article.slug = 'text'
    return await this.articleRepository.save(article);
}

}

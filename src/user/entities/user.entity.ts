import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn, } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ArticleEntity } from '@/article/entities/article.entity';

@Entity({name: 'users'})
export class User {

@PrimaryGeneratedColumn('increment')
id: number;

@Column()
email: string;

@Column()
username: string;
//第一个参数：指定关联的实体类
//第二个参数：指定反向关联：ArticleEntity实体的author字段是关联到当前User实体的反向关联字段 建立双向连接。
@OneToMany(()=>ArticleEntity,(article)=>article.author)
articles:ArticleEntity[]

@Column({default:''})
bio: string;

@Column({default:''})
imge: string;

@Column()
password?: string;

@BeforeInsert()
@BeforeUpdate()
async hashPassword() {
if (this.password) {
  this.password = await bcrypt.hash(this.password, 10);
   
}
}


}

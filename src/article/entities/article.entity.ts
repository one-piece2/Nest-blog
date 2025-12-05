import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity'; // 需先创建User实体

@Entity()
export class ArticleEntity {
  @PrimaryGeneratedColumn('increment') // 主键自增
  id: number;

  @Column({ unique: true }) // slug唯一
  slug: string;

  @Column()
  title: string;

@Column()
authorId: number;

  @Column({ nullable: true }) // 描述可选
  description: string;

  @Column({ type: 'text' }) // 正文用text类型
  body: string;

  @Column('simple-array') // 标签列表（存储为数组）
  tagList: string[];

  @CreateDateColumn() // 自动生成创建时间
  createdAt: Date;

  @UpdateDateColumn() // 自动生成更新时间
  updatedAt: Date;

  @Column({ default: false }) // 是否收藏
  favorited: boolean;

  @Column({ default: 0 }) // 收藏数
  favoritesCount: number;

  // 关联User实体（多对一：多篇文章属于一个作者）
  @ManyToOne(() => User, (user) => user.articles)
  //我要通过authorId这个字段和User关联
  @JoinColumn({ name: 'authorId' })
  author: User;
}
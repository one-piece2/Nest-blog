import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tag' })
export class Tag {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  name:string;
// 标签创建时间
  @CreateDateColumn({type: 'timestamp'})
  createAt: Date;
}




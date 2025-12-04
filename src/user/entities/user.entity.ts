import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({name: 'users'})
export class User {

@PrimaryGeneratedColumn('increment')
id: number;

@Column()
email: string;

@Column()
username: string;


@Column({default:''})
bio: string;

@Column({default:''})
imge: string;

@Column()
password: string;

@BeforeInsert()
@BeforeUpdate()
async hashPassword() {
if (this.password) {
  this.password = await bcrypt.hash(this.password, 10);
   
}
}


}

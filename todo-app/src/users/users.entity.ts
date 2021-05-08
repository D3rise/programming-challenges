import { Base } from 'src/database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends Base {
  @Column({
    length: 32,
    unique: true
  })
  username: string;

  @Column()
  passwordHash: string;
}

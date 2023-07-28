import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 20 })
  username: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: ''
  })
  lastLoginIp: string;

  @Column()
  @UpdateDateColumn()
  lastLoginTime: Date;
}

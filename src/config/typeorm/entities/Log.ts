import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('log')
export class Log {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 20 })
  username: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  event: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: ''
  })
  ip: string;

  @Column({
    nullable: true
  })
  @CreateDateColumn()
  time: Date;
}

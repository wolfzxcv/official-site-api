import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('g_mlxyh')
export class MLXYH {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: 30,
    default: null
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: null
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 30,
    default: null
  })
  account: string;

  @Column()
  @CreateDateColumn({
    default: null
  })
  time: Date;
}

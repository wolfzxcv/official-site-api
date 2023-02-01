import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('g_WCGTGH')
export class WCGTGH {
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
  mobile: string;

  @Column({
    type: 'varchar',
    length: 30,
    default: null
  })
  qq: string;

  @Column()
  @CreateDateColumn({
    default: null
  })
  time: Date;
}

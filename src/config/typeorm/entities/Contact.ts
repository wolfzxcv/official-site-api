import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('contact')
export class Contact {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: 30,
    default: null
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 30,
    default: null
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 30,
    default: null
  })
  mobile: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: null
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: null
  })
  content: string;

  @Column()
  @CreateDateColumn({
    default: null
  })
  time: Date;
}

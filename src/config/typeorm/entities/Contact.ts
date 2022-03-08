import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('d_contact')
export class Contact {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    default: null
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: null
  })
  surname: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: null
  })
  mobile: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: null
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: null
  })
  area: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: null
  })
  type: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: null
  })
  iScustomer: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: null
  })
  login: string;

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

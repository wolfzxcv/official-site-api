import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('d_focus')
export class Focus {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int', default: 0 })
  lang: number;

  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 200,
    default: ''
  })
  abstract: string;

  @Column({
    type: 'longtext',
    default: ''
  })
  content: string;

  @Column()
  @UpdateDateColumn({
    default: '0000-00-00 00:00:00'
  })
  time: Date;

  @Column()
  @UpdateDateColumn({
    nullable: true
  })
  showTime: Date;
}
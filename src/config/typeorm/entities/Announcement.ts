import { Locales } from 'src/@types';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('announcement')
export class Announcement {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', default: 'cn' })
  lang: Locales;

  @Column({
    type: 'varchar',
    length: 255
  })
  title: string;

  @Column({
    type: 'longtext'
  })
  content: string;

  @Column({
    type: 'tinyint',
    default: 0
  })
  onTop: string;

  @Column()
  @CreateDateColumn({
    default: new Date()
  })
  createTime: Date;

  @Column({
    nullable: true
  })
  updateTime: Date;
}

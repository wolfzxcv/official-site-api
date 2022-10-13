import { Locales } from 'src/@types';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('g_responsibility')
export class Responsibility {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', default: 'cn' })
  lang: Locales;

  @Column({
    type: 'varchar',
    length: 255,
    default: ''
  })
  title: string;

  @Column({
    type: 'longtext'
  })
  content: string;

  @Column()
  @UpdateDateColumn({
    default: '0000-00-00 00:00:00'
  })
  createTime: Date;

  @Column()
  @UpdateDateColumn({
    nullable: true
  })
  showTime: Date;

  @Column()
  @UpdateDateColumn({
    default: '0000-00-00 00:00:00'
  })
  updateTime: Date;

  @Column()
  @UpdateDateColumn({
    type: 'varchar',
    length: 255,
    default: ''
  })
  externalLink: string;
}

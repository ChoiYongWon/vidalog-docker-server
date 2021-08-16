import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/repositories/user.entity';

@Entity()
export class Post{
  @PrimaryColumn()
  id: string;

  @Column()
  date: Date;

  @Column()
  content: string;

  @Column("simple-array", {default: ""})
  imageUrls: string[];

  @Column()
  location: string;

  @ManyToOne(type=>User, post=>post.id)
  user: string;
}
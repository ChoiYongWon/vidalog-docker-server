import { Entity, Column, PrimaryColumn } from 'typeorm';
import { Role } from '../enum/Role.enum';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column()
  role: Role;

  @Column()
  refreshToken?: string

}
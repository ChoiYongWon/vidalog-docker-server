import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Email {
  @PrimaryColumn()
  email: string;

  @Column()
  verificationCode: string;
}
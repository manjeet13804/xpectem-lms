import { Exclude, Expose } from 'class-transformer';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from './User';

@Expose()
@Entity()
export class NotesUsers {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public text: string;
}

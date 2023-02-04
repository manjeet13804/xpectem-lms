import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { User } from './User';
import { TutorFile } from './TutorFile';

@Entity()
export class TutorFolder {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Exclude()
  @ManyToOne(() => User)
  @JoinColumn()
  public tutor: User;

  @OneToMany(() => TutorFile, tutorFile => tutorFile.folder)
  public files: TutorFile[];

  constructor(tutorFolder: Partial<TutorFolder>) {
    !!tutorFolder && Object.assign(this, tutorFolder);
  }
}

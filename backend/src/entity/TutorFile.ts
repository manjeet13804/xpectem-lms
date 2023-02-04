import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { TutorFolder } from './TutorFolder';
import { Expose } from 'class-transformer';
import { User } from './User';

@Entity()
export class TutorFile {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public url: string;

  @Column()
  public mimeType: string;

  @Expose({ groups: ['update'] })
  @ManyToOne(() => TutorFolder, tutorFolder => tutorFolder.files, { onDelete: 'CASCADE' })
  public folder: TutorFolder;

  @ManyToOne(() => User, user => user.tutorFiles, { onDelete: 'CASCADE'})
  public tutor: User;

  constructor(tutorFile: Partial<TutorFile>) {
    !!tutorFile && Object.assign(this, tutorFile);
  }
}

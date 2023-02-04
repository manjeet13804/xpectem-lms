import { Expose } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CourseAttachment } from './CourseAttachment';

@Expose()
@Entity()
export class FileTopics {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public header: string;

  @Column()
  public createdAt: Date;

  @OneToMany(type => CourseAttachment,
             courseAttachment => courseAttachment.fileTopics)
  public files: CourseAttachment[];

  constructor(fileTopics: Partial<FileTopics>) {
    !!fileTopics && Object.assign(this, fileTopics);
  }
}

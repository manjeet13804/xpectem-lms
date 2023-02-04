import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Language } from './Language';
import { Course} from './Course';

@Entity()
@Index(['course', 'language'])
export class CourseTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Course, course => course.id, { onDelete: 'CASCADE' })
  course: Course;

  @ManyToOne(type => Language, language => language.id, { onDelete: 'CASCADE' })
  language: Language;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  descriptionShort: string;

  @Column({ type: 'text' })
  welcomeLetter: string;

  @Column({ type: 'text' })
  welcomeEmail: string;

  @Column({ type: 'text', nullable: true })
  public systemRequirements: string;

  constructor(courseTranslation: Partial<CourseTranslation>) {
    if (courseTranslation) {
      Object.assign(this, courseTranslation);
    }
  }
}

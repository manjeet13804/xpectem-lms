import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn
} from 'typeorm';
import { User } from './User';
import { Taxonomy } from './Taxonomy';

@Entity()
export class StudentTaxonomy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  public value: string;

  @ManyToOne(() => User, user => user.studentTaxonomy)
  public user: User;

  @ManyToOne(() => Taxonomy, taxonomy => taxonomy.studentTaxonomy)
  public taxonomy: Taxonomy;

  constructor(studentToTaxonomy: Partial<StudentTaxonomy>) {
    if (studentToTaxonomy) {
      Object.assign(this, studentToTaxonomy);
    }
  }
}
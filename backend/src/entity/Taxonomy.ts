import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LmsGroup } from './LmsGroup';
import { StudentTaxonomy } from './StudentTaxonomy';

@Entity()
export class Taxonomy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  public title: string;

  @Column()
  public format: string;

  @Column()
  public mandatory: boolean;

  @ManyToOne(() => LmsGroup, lmsGroup => lmsGroup.taxonomy)
  public lmsGroup: LmsGroup;

  @OneToMany(() => StudentTaxonomy, studentTaxonomy => studentTaxonomy.taxonomy)
  public studentTaxonomy: StudentTaxonomy;

  constructor(taxonomy: Partial<Taxonomy>) {
    if (taxonomy) {
      Object.assign(this, taxonomy);
    }
  }
}
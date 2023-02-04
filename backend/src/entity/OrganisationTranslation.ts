import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Language } from './Language';
import { Organisation } from './Organisation';

@Entity()
@Index(['organisation', 'language'])
export class OrganisationTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Organisation, organisation => organisation.id, { onDelete: 'CASCADE' })
  organisation: Organisation;

  @ManyToOne(type => Language, language => language.id, { onDelete: 'CASCADE' })
  language: Language;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  adminWelcomeText: string;

  @Column({ type: 'text' })
  studentWelcomeText: string;
}

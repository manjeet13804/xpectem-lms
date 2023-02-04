import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Language } from './Language';
import { LmsGroup } from './LmsGroup';

@Entity()
@Index(['lmsGroup', 'language'])
export class LmsGroupTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => LmsGroup, lmsGroup => lmsGroup.id, { onDelete: 'CASCADE' })
  lmsGroup: LmsGroup;

  @ManyToOne(type => Language, language => language.id, { onDelete: 'CASCADE' })
  language: Language;

  @Column({type: 'text'})
  description: string;

  @Column({type: 'text'})
  adminWelcomeText: string;

  @Column({type: 'text'})
  studentWelcomeText: string;
}

import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Group } from './Group';
import { Language } from './Language';

@Entity()
@Index(['group', 'language'])
export class GroupTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Group, group => group.id, { onDelete: 'CASCADE' })
  group: Group;

  @ManyToOne(type => Language, language => language.id, { onDelete: 'CASCADE' })
  language: Language;

  @Column({ type: 'text' })
  description: string;
}

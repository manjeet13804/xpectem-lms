import { Column } from 'typeorm';

export class CourseWelcomeEmail {
  @Column()
  public fromEmail: string;

  @Column()
  public fromName: string;

  @Column({ type: 'text' })
  public content: string;

  @Column()
  public url: string;
}

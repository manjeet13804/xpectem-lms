import { Column } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

@Expose()
export class CourseTime {
  @Column({ nullable: true })
  @ApiModelProperty()
  public complete: number;

  @Column({ nullable: true })
  @ApiModelProperty()
  public access?: number|null;

  @Exclude()
  @Column({ nullable: true })
  public sendReminders?: boolean;

  @Column({
    type: 'text',
    nullable: true,
  })
  @ApiModelProperty()
  public extraInfo?: string;
}

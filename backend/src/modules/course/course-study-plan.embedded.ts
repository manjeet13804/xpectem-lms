import { Column } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

export class CourseStudyPlan {
  @Column({ nullable: true })
  @ApiModelProperty()
  public studentAccess: boolean;

  @Column({ nullable: true })
  @ApiModelProperty()
  public approximatelyDays: number;
}

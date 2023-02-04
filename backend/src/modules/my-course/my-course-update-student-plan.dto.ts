import { ApiModelProperty } from '@nestjs/swagger';
import * as config from 'config';
import { Type } from 'class-transformer';
import { IsIn, IsNumber, ValidateIf } from 'class-validator';

const HOURS_VARIATIONS: number[] = config.get(
  'studyPlan.hoursVariations',
);

export class MyCourseUpdateStudentPlanDto {
  @Type(() => Date)
  @ValidateIf(({ hoursPerWeek }) => !hoursPerWeek)
  @ApiModelProperty()
  public readonly wishedDoneDate: Date;

  @IsNumber()
  @IsIn(HOURS_VARIATIONS)
  @ValidateIf(({ wishedDoneDate }) => !wishedDoneDate)
  @ApiModelProperty()
  public readonly hoursPerWeek: number;
}

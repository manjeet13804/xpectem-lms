import { ApiModelProperty } from '@nestjs/swagger';

export class CreateTutorDto {
  @ApiModelProperty({ required: true })
  public readonly firstName: string;

  @ApiModelProperty({ required: true })
  public readonly lastName: string;

  @ApiModelProperty({ isArray: true, type: 'string' })
  public readonly email: string[];

  @ApiModelProperty({ isArray: true, type: 'string' })
  public readonly phone: string[];

  @ApiModelProperty({ type : {
    type: 'array',
    format: 'number',
    items: {
      type: 'number',
    },
  }})
  public readonly coursesIds: number[];

  @ApiModelProperty({ required: true })
  public readonly language: number;

  @ApiModelProperty({ required: true })
  public readonly notifyEmail: boolean;

  @ApiModelProperty({ required: true })
  public readonly notifySms: boolean;

  @ApiModelProperty({ required: true })
  public readonly isDeactivated: boolean;
}

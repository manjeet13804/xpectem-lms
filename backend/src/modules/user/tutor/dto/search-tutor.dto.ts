import { ApiModelProperty } from '@nestjs/swagger';

export class SearchTutorDto {
  @ApiModelProperty()
  public readonly firstName: string;

  @ApiModelProperty()
  public readonly lastName: string;

  @ApiModelProperty()
  public readonly email: string;

  @ApiModelProperty()
  public readonly phone: string;

  @ApiModelProperty()
  public readonly personNumber: string;

  @ApiModelProperty()
  public readonly employeeNumber: string;

  @ApiModelProperty()
  public readonly isDeactivated: boolean;
}

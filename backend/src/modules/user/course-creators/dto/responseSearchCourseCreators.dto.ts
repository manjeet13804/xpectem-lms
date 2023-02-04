import { ApiModelProperty } from '@nestjs/swagger';
import { UserEmail } from '../../../../entity/UserEmail';
import { UserPhone } from '../../../../entity/UserPhone';

export class ResponseSearchCourseCreatorsDto {
  @ApiModelProperty()
  public id : number;

  @ApiModelProperty()
  public firstName : string;

  @ApiModelProperty()
  public lastName: string;

  @ApiModelProperty()
  public avatar: string;

  @ApiModelProperty()
  public personNumber: string;

  @ApiModelProperty()
  public employeeNumber: string;

  @ApiModelProperty()
  public roles: string;

  @ApiModelProperty()
  public createdAt: string;

  @ApiModelProperty({ isArray: true })
  public userEmail: UserEmail;

  @ApiModelProperty({ isArray: true })
  public userPhone: UserPhone;
}
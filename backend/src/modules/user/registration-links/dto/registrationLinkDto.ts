import { ApiModelProperty } from '@nestjs/swagger';

export class RegistrationLinkDto {  
    @ApiModelProperty()
    groups: number[];

    @ApiModelProperty()
    courses: number[];

    @ApiModelProperty()
    active: boolean;
    
    @ApiModelProperty()
    createdAt: Date;
}

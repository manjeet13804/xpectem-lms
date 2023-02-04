import { ApiModelProperty } from '@nestjs/swagger';

export class RegistrationLinkMakeActiveDto {
    
    @ApiModelProperty()
    active: boolean;
}

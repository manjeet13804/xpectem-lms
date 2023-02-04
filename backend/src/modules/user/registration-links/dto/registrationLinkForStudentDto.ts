import { ApiModelProperty } from '@nestjs/swagger';
import { RegistrationLink } from '../../../../entity/RegistrationLink'
import { Taxonomy } from '../../../../entity/Taxonomy'

export class RegistrationLinkForStudentDto {  
    @ApiModelProperty()
    registrationLinks: RegistrationLink;

    @ApiModelProperty()
    taxonomies?: Taxonomy[];
}
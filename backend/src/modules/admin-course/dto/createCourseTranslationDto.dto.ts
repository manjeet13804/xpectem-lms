import { ApiModelProperty } from '@nestjs/swagger';

export class CreateCourseTranslationDto {
  @ApiModelProperty()
  public readonly systemRequirements: string;

  @ApiModelProperty()
  languageId: number;

  @ApiModelProperty()
  description: string;

  @ApiModelProperty()
  welcomeLetter: string;

  @ApiModelProperty()
  welcomeEmail: string;

  @ApiModelProperty()
  descriptionShort: string;
}

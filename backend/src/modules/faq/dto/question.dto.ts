import { ApiModelProperty } from '@nestjs/swagger';
import { FaqTypeEnum } from '../faq-type.enum'

export class QuestionAnswerDto {
  @ApiModelProperty()
  readonly question: string;

  @ApiModelProperty()
  readonly answer: string;
}

export class CreateQuestionDto {
  @ApiModelProperty()
  readonly courseId?: number;

  @ApiModelProperty()
  readonly topics: number[];

  @ApiModelProperty()
  readonly question: string;

  @ApiModelProperty()
  readonly answer: string;

  @ApiModelProperty()
  readonly studentId?: number;

  @ApiModelProperty()
  readonly faqType?: FaqTypeEnum;
}

export class AddTitleDto {
  @ApiModelProperty()
  readonly title: string;

  @ApiModelProperty()
  readonly faqType?: FaqTypeEnum;

  @ApiModelProperty()
  readonly courseId?: number;
}

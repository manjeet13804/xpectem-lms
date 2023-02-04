import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '../../entity/User';

export class SendMessageDto {
  @ApiModelProperty()
  public readonly message: string;

  @ApiModelProperty()
  public readonly closeDialog: boolean;
}

export class SearchByAllMessageDto {
  @ApiModelProperty({ required: false })
  public readonly search: string;
}

export class CreateDialogAndSendMessageDto {
  @ApiModelProperty()
  public readonly heading: string;

  @ApiModelProperty()
  public readonly message: string;

  @ApiModelProperty()
  public readonly closeDialog: boolean;

  @ApiModelProperty()
  public readonly isAbortDialog: boolean;
}

export class EditHeaderDto {
  @ApiModelProperty({
    description: 'New dialog\'s header',
  })
  public readonly heading: string;
}

export class ReassignHeaderDto {
  @ApiModelProperty()
  public readonly studentId: number;

  @ApiModelProperty()
  public readonly courseId: number;

  @ApiModelProperty()
  public readonly tutorId: number;
}

export class CommunicationDataDto {
  public readonly studentId: number;
  public readonly courseId: number;
  public readonly dialogId?: number;
  public readonly user: User;
}

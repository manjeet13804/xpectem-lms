import { ApiModelProperty } from '@nestjs/swagger';

export class CertificateDto {
  @ApiModelProperty()
  public readonly id: number;

  @ApiModelProperty()
  public readonly city: string;

  @ApiModelProperty()
  public readonly street: string;

  @ApiModelProperty()
  public readonly zip: number;

  @ApiModelProperty()
  public readonly startAt: Date;
}

export class CreateCertificateDto {
  @ApiModelProperty()
  public readonly city: string;

  @ApiModelProperty()
  public readonly street: string;

  @ApiModelProperty()
  public readonly zip: number;

  @ApiModelProperty()
  public readonly startAt: Date;
}

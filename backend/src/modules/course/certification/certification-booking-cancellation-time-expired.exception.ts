import { ForbiddenException } from '@nestjs/common';
import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { HasProblemInterface } from '../../../common/exceptions/has-problem.interface';
import { Certification } from './certification.entity';

export class CertificationBookingCancellationTimeExpiredException
  extends ForbiddenException
  implements HasProblemInterface {

  @Expose()
  @ApiModelProperty()
  public readonly message: string;

  @Expose()
  @ApiModelProperty({ example: 'BOOKING_CANCELLATION_TIME_EXPIRED' })
  public readonly problem: string = 'BOOKING_CANCELLATION_TIME_EXPIRED';

  public static for = (
    certification: Certification,
  ): CertificationBookingCancellationTimeExpiredException => {
    return new CertificationBookingCancellationTimeExpiredException(
      `Certification#${certification.id} booking cancellation time has expired.`,
    );
  }

  constructor(message: string = 'Certification booking cancellation time has expired.') {
    super(message);
  }
}

import { ConflictException } from '@nestjs/common';
import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { HasProblemInterface } from '../../../common/exceptions/has-problem.interface';
import { Certification } from './certification.entity';

export class CertificationAlreadyBookedException
  extends ConflictException
  implements HasProblemInterface {

  @Expose()
  @ApiModelProperty()
  public readonly message: string;

  @Expose()
  @ApiModelProperty({ example: 'CERTIFICATION_ALREADY_BOOKED' })
  public readonly problem: string = 'CERTIFICATION_ALREADY_BOOKED';

  public static forThis = (
    certification: Certification,
  ): CertificationAlreadyBookedException => {
    return new CertificationAlreadyBookedException(
      `Certification#${certification.id} already booked for this course.`,
    );
  }

  public static forAnother = (
    certification: Certification,
  ): CertificationAlreadyBookedException => {
    return new CertificationAlreadyBookedException(
      `Certification#${certification.id} already booked for another course.`,
    );
  }

  constructor(message: string = 'Certification already booked.') {
    super(message);
  }
}

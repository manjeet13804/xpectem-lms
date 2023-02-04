import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Controller, Delete, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';
import { CertificationBookingService } from './certification-booking.service';
import { CertificationAlreadyBookedException } from './certification-already-booked.exception';
import { CourseIsNotFinishedYetException } from '../course-is-not-finished-yet.exception';
import { CertificationBookingCancellationTimeExpiredException } from './certification-booking-cancellation-time-expired.exception';

@ApiBearerAuth()
@ApiUseTags('certification')
@Controller()
export class CertificationBookingController {
  public constructor(
    public readonly bookings: CertificationBookingService,
  ) {}

  @Post(':certificationId/booking')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'own',
    resource: 'course-certification-booking',
  })
  @ApiOperation({ title: 'Book certification' })
  @ApiResponse({
    description: 'Returns an exception when course/certification not found.',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    description: 'Returns an exception when course is not finished yet.',
    status: HttpStatus.BAD_REQUEST,
    type: CourseIsNotFinishedYetException,
  })
  @ApiResponse({
    description: 'Returns an exception when certification already booked.',
    status: HttpStatus.CONFLICT,
    type: CertificationAlreadyBookedException,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  book(
    @Param('courseId') courseId: number,
    @Param('certificationId') certificationId: number,
    @Req() { user },
  ) {
    return this.bookings.book(
      user,
      courseId,
      certificationId,
    );
  }

  @Delete(':certificationId/booking')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'delete',
    possession: 'own',
    resource: 'course-certification-booking',
  })
  @ApiOperation({ title: 'Cancel booking' })
  @ApiResponse({
    description: 'Returns an exception when course/certification/booking not found.',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    description: 'Returns an exception when course is not finished yet.',
    status: HttpStatus.BAD_REQUEST,
    type: CourseIsNotFinishedYetException,
  })
  @ApiResponse({
    description: 'Returns an exception when certification booking cannot be cancel.',
    status: HttpStatus.FORBIDDEN,
    type: CertificationBookingCancellationTimeExpiredException,
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  cancel(
    @Param('courseId') courseId: number,
    @Param('certificationId') certificationId: number,
    @Req() { user },
  ) {
    return this.bookings.cancel(
      user,
      courseId,
      certificationId,
    );
  }
}

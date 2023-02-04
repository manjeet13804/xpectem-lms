import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Req, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';
import { AdminCertificationService } from './admin-certification.service';
import { CertificationView } from '../course/certification/certification.view';
import { CourseIsNotFinishedYetException } from '../course/course-is-not-finished-yet.exception';
import {
  CertificationBookingCancellationTimeExpiredException,
} from '../course/certification/certification-booking-cancellation-time-expired.exception';
import { CertificateDto, CreateCertificateDto } from './dto/admin.certification.dto';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import { DATE_FORMATS } from '../../common/enums/dateFormats'
import * as baseJoi from 'joi';
import * as extension from 'joi-date-extensions';

const joi = baseJoi.extend(extension);
const { certificateDate } = DATE_FORMATS;

@ApiBearerAuth()
@ApiUseTags('admin certification')
@Controller('admin-certification')
export class AdminCertificationController {
  public constructor(
    public readonly certifications: AdminCertificationService,
  ) {}
  
  @Delete('/:id')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'delete',
    possession: 'any',
    resource: 'admin-certification',
  })
  @ApiOperation({
    title: 'Delete the certification date.'
  })
  @ApiResponse({
    description: 'Return a delete status',
    status: HttpStatus.OK,
  })
  public async deleteCertificationDate(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<HttpStatus> {
    return this.certifications.deleteCertificate(id);
  }

  @Put('/:id')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'admin-certification',
  })
  @ApiOperation({
    title: 'Update the certification date.'
  })
  @ApiResponse({
    description: 'Return a updated certification date.',
    status: HttpStatus.OK,
    type: CertificateDto
  })
  @UsePipes(new JoiValidationPipe({
    city: joi.string().required(),
    street: joi.string().required(),
    zip: joi.number().integer().positive().required(),
    startAt: joi.date().utc().required()
  }))
  public async updateCertificationDate(
    @Body() body: CreateCertificateDto,
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<CertificateDto> {
    return this.certifications.updateCertificate(id, body);
  }

  @Post()
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'admin-certification',
  })
  @ApiOperation({
    title: 'Create new certification date.'
  })
  @ApiResponse({
    description: 'Return a created certification date.',
    status: HttpStatus.OK,
    type: CertificateDto
  })
  @UsePipes(new JoiValidationPipe({
    city: joi.string().required(),
    street: joi.string().required(),
    zip: joi.number().integer().positive().required(),
    startAt: joi.date().utc().required()
  }))
  public async createCertificationDate(
    @Body() body: CreateCertificateDto
  ): Promise<CertificateDto> {
    return this.certifications.createCertificate(body);
  }

  @Get()
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'admin-certification',
  })
  @ApiOperation({
    title: 'Get list of allowed certifications'
  })
  @ApiResponse({
    description: 'Returns all records of certifications.',
    status: HttpStatus.OK,
    isArray: true,
    type: CertificateDto
  })
  public async getAllCertifications(): Promise<CertificateDto[]> {
    return this.certifications.getAllCertifications();
  }

  @Get('/students/:studentId/courses/:courseId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({
    title: 'Get list of certification by course that is certified and finished',
  })
  @ApiResponse({
    description: 'Returns an exception when course is not finished yet.',
    status: HttpStatus.BAD_REQUEST,
    type: CourseIsNotFinishedYetException,
  })
  @ApiResponse({
    description: 'Returns all records.',
    status: HttpStatus.OK,
    type: [CertificationView],
  })
  public async getListCertification(
    @Param('studentId', new ParseIntPipe()) studentId: number,
    @Param('courseId', new ParseIntPipe()) courseId: number,
  ): Promise<CertificationView[]> {
    return this.certifications.getListCertification(studentId, courseId);
  }

  @Post('/students/:studentId/courses/:courseId/certificate/:certificationId/booking')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({
    title: 'Reserving certification by course',
  })
  @ApiBadRequestResponse({
    description: 'Returns an exception when course is not finished yet.',
    type: CourseIsNotFinishedYetException,
  })
  @ApiOkResponse({
    description: 'Returns new list with certification dates.',
  })
  public async reserveCertificationBooking(
    @Param('studentId', new ParseIntPipe()) studentId: number,
    @Param('courseId', new ParseIntPipe()) courseId: number,
    @Param('certificationId', new ParseIntPipe()) certificateId: number,
  ): Promise<CertificationView[]> {
    return this.certifications.reserveCertificationBooking(studentId, courseId, certificateId);
  }

  @Delete('/students/:studentId/courses/:courseId/')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'delete',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Cancel booking' })
  @ApiOkResponse({
    description: 'Returns an exception when course/certification/booking not found.',
  })
  @ApiResponse({
    description: 'Returns an exception when course is not finished yet.',
    status: HttpStatus.BAD_REQUEST,
    type: CourseIsNotFinishedYetException,
  })
  @ApiBadRequestResponse({
    description: 'Returns an exception when certification booking cannot be cancel.',
    type: CertificationBookingCancellationTimeExpiredException,
  })
  @ApiOkResponse({
    description: 'Cancel booking.',
  })
  public async cancelReserve(
    @Param('studentId', new ParseIntPipe()) studentId: number,
    @Param('courseId', new ParseIntPipe()) courseId: number,
  ): Promise<CertificationView[]> {
    return this.certifications.cancelReserve(studentId, courseId);
  }
}

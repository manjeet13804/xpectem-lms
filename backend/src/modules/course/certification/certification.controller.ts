import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Controller, Get, HttpStatus, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';
import { CertificationService } from './certification.service';
import { CertificationView } from './certification.view';
import { CourseIsNotFinishedYetException } from '../course-is-not-finished-yet.exception';

@ApiBearerAuth()
@ApiUseTags('certification')
@Controller()
export class CertificationController {
  public constructor(
    public readonly certifications: CertificationService,
  ) {}

  @Get()
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course-certification',
  })
  @ApiOperation({
    title: 'Get list of certification by course that user have access',
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
    @Param('courseId') courseId: number,
    @Req() { user },
  ) {
    return this.certifications.getAll(user, courseId);
  }
}

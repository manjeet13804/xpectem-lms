import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Post,
  HttpStatus,
  Param,
  Patch,
  Req,
  SerializeOptions,
  UseGuards,
  Res,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';
import { MyCourseService } from './my-course.service';
import { MyGroupedCourseDto } from './my-grouped-course.dto';
import { MyCourseStudentPlanDto } from './my-course-student-plan.dto';
import { MyCourseUpdateStudentPlanDto } from './my-course-update-student-plan.dto';
import { MyCourseView } from './my-course.view';
import { Response } from 'express';

@ApiBearerAuth()
@ApiUseTags('my-course')
@Controller('my-course')
export class MyCourseController {
  constructor(private courses: MyCourseService) {
  }

  @Get()
  @SerializeOptions({ groups: ['full'] })
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'my-course',
  })
  @ApiOperation({ title: 'Get list of courses that user have access' })
  @ApiResponse({
    description: 'Returns all records.',
    status: HttpStatus.OK,
    type: [MyGroupedCourseDto],
  })
  async getMyGroupedCourses(
    @Req() { user }
  ) {
    return this.courses.getMyGroupedCourses(user);
  }

  @Get(':id')
  @SerializeOptions({ groups: ['full'] })
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'my-course',
  })
  @ApiOperation({ title: 'Get course content' })
  @ApiResponse({
    description: 'Returns an one course.',
    status: HttpStatus.OK,
    type: MyCourseView,
  })
  async getMyCourse(
    @Param('id') id: number,
    @Req() { user },
  ) {
    const course = await this.courses.getMyCourse(user, id);

    const test = new MyCourseView(course, user);

    return test;
  }

  @Post('welcome-letter/:id')
  @SerializeOptions({ groups: ['full'] })
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'my-course',
  })
  @ApiOperation({ title: 'Get course content' })
  @ApiResponse({
    description: 'Returns an one course.',
    status: HttpStatus.OK,
    type: MyCourseView,
  })
  async getDownloadUrlFile(
    @Query('welcomeLetterURL') welcomeLetterURL: string,
    @Res() res: Response,
  ) {
    const pdfFile = await this.courses.htmlToPdf(welcomeLetterURL);
    await this.courses.createPdf(res, pdfFile);
  }

  @Post('welcome-letter-richText/:id')
  @SerializeOptions({ groups: ['full'] })
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'my-course',
  })
  @ApiOperation({ title: 'Get course content' })
  @ApiResponse({
    description: 'Returns an one course.',
    status: HttpStatus.OK,
    type: MyCourseView,
  })
  async getDownloadRichTextFile(
    @Query('welcomeLetterRichText') welcomeLetterRichText: string,
    @Res() res: Response,
  ) {
    const pdfFile = await this.courses.richTextToPdf(welcomeLetterRichText);
    await this.courses.createPdf(res, pdfFile);
  }

  @Get(':id/study-plan')
  @SerializeOptions({ groups: ['full'] })
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'my-course',
  })
  @ApiOperation({ title: 'Get course study-plan' })
  @ApiResponse({
    description: 'Returns a study-plan.',
    status: HttpStatus.OK,
    type: MyCourseStudentPlanDto,
  })
  getCourseStudentPlan(
    @Param('id') id: number,
    @Req() { user },
  ) {
    return this.courses.getCourseStudentPlan(user, id);
  }

  @Patch(':id/study-plan')
  @SerializeOptions({ groups: ['full'] })
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'my-course',
  })
  @ApiOperation({ title: 'Update student study-plan' })
  @ApiResponse({
    description: 'Returns a study-plan.',
    status: HttpStatus.OK,
    type: MyCourseStudentPlanDto,
  })
  updateCourseStudentPlan(
    @Param('id') id: number,
    @Req() { user },
    @Body() dto: MyCourseUpdateStudentPlanDto,
  ) {
    return this.courses.updateCourseStudentPlan(user, id, dto);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger';
import * as config from 'config';
import { ACGuard, UseRoles } from 'nest-access-control';
import { IRequest } from 'src/common/interfaces/globalInterfaces';

import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import { CourseAttachment } from '../../entity/CourseAttachment';
import { FileTopics } from '../../entity/FileTopics';
import { Course } from '../../entity/Course';
import { CourseStudent } from '../../entity/CourseStudent';
import { Topic } from '../../entity/Topics';
import { CourseCertificate } from '../course/course-certificate.entity';
import { AdminCourseService } from './admin.course.service';
import {
  ChangeCourseStatusDto,
  CourseTimeDto,
  CourseTopicsSearchDto,
  CreateCourseDto,
  FilesSearchDto,
  FileTemplateDto,
  FileTopicsSearchDto,
  SearchCourseDto,
  UpdateCourseDto,
  UpdateCourseFilesDto,
  UpdateCourseTopicsDto,
  UpdateCourseTutorsDto,
  SearchCourseGroupDto,
  UploadFileDto,
  CreateTopicDto,
  UpdateTopicInfoDto,
  CategoriesDto,
  IPermissionDto,
  PermissionDto,
  IPermission,
} from './dto/admin.course.dto';
import {
  getCoursePermission,
  getCourseTopicsSearchValidation,
  getCourseValidation,
  getFilesSearchValidation,
  getFilesTopicsSearchValidation,
  getFileValidation, postCoursePermissionValidation,
  postCourseTopicsValidation,
  postCourseValidation,
  postFilesUploadValidation,
  putCourseFilesValidation,
  putCourseStatusValidation,
  putCourseTimeValidation, putCourseTopicsIDValidation,
  putCourseTopicsValidation,
  putCourseTutorsValidation,
  putCourseValidation,
  putFilesUploadValidation
} from "./schemas/adminCourseSchemas";

const ATTACHMENT_MAX_COUNT: number = config.get('course.attachmentMaxCount');
const ATTACHMENT_MAX_SIZE: number = config.get('course.fileMaxSize');
const { CERTIFICATE_TEMPLATE, WELCOME_EMAIL_TEMPLATE, WELCOME_LETTER_TEMPLATE, IMAGE_FILE } = config.get(
  'course.fieldName',
);

@ApiBearerAuth()
@ApiUseTags('admin course')
@Controller('admin')
export class AdminCourseController {
  public constructor(private readonly courseService: AdminCourseService) { }

  @Get('course/categories')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course',
  })
  @ApiOperation({ title: 'Get categories list' })
  @ApiOkResponse({
    description: 'Return a list of categories',
    type: CategoriesDto,
  })
  public async getListOfCategories(): Promise<CategoriesDto> {
    return this.courseService.getListOfCategories();
  }

  @Get('course-student')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course',
  })
  @ApiOkResponse({
    description: 'Return a list of categories',
    type: SearchCourseGroupDto,
  })
  public async getGroupCoursies(
    @Query() query: SearchCourseGroupDto,
  ): Promise<CourseStudent[]> {
    return this.courseService.getGroupCoursies(query);
  }

  @Get('courses/reports/download')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course',
  })
  @ApiOperation({ title: 'Download report for coursies' })
  @ApiOkResponse({
    description: 'Return a csv file',
    type: SearchCourseGroupDto,
  })
  public async downloadTemplate(@Res() res: Response, @Query() query: SearchCourseGroupDto): Promise<CourseStudent[]> {
    return this.courseService.downloadReportFile(res, query);
  }

  @Post('course-permission')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course',
  })
  @ApiOkResponse({
    description: 'Return lms course permission status',
  })
  @UsePipes(
    new JoiValidationPipe(postCoursePermissionValidation),
  )
  public async setCoursePermission(
    @Body() body: IPermissionDto,
  ): Promise<HttpStatus> {
    return this.courseService.setCoursePermission(body);
  }

  @Get('course-permission')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course',
  })
  @ApiOkResponse({
    description: 'Return lms course permission status',
  })
  @UsePipes(
    new JoiValidationPipe(getCoursePermission),
  )
  public async getCoursePermission(
    @Query() query: PermissionDto,
  ): Promise<IPermission[]> {
    return this.courseService.getCoursePermission(query);
  }

  @Get('course')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course',
  })
  @ApiOperation({ title: 'Get all courses' })
  @ApiOkResponse({
    description: 'Return all courses',
    type: [Course],
  })
  @UsePipes(
    new JoiValidationPipe(getCourseValidation),
  )
  public async getAllCourse(
    @Query() query: SearchCourseDto,
    @Req() { user }: IRequest
  ): Promise<Course[]> {
    return this.courseService.getAllCourse(query, user);
  }

  @Post('course')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course',
  })
  @ApiOperation({ title: 'Create course' })
  @ApiCreatedResponse({
    description: 'Return created course',
    type: Course,
  })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: CERTIFICATE_TEMPLATE,
          maxCount: ATTACHMENT_MAX_COUNT,
        },
        {
          name: WELCOME_EMAIL_TEMPLATE,
          maxCount: ATTACHMENT_MAX_COUNT,
        },
        {
          name: WELCOME_LETTER_TEMPLATE,
          maxCount: ATTACHMENT_MAX_COUNT,
        },
        {
          name: IMAGE_FILE,
        },
      ],
      {
        limits: {
          fileSize: ATTACHMENT_MAX_SIZE,
        },
      },
    ),
  )
  @UsePipes(
    new JoiValidationPipe(postCourseValidation),
  )
  public async createCourse(
    @UploadedFiles() files,
    @Body() dataCourse: CreateCourseDto,
    @Req() { user },
  ) {
    return this.courseService.createCourse(dataCourse, files, user);
  }

  @Put('course')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course',
  })
  @ApiOperation({ title: 'Update course' })
  @ApiCreatedResponse({
    description: 'Return updated course',
    type: Course,
  })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: CERTIFICATE_TEMPLATE,
          maxCount: ATTACHMENT_MAX_COUNT,
        },
        {
          name: WELCOME_EMAIL_TEMPLATE,
          maxCount: ATTACHMENT_MAX_COUNT,
        },
        {
          name: WELCOME_LETTER_TEMPLATE,
          maxCount: ATTACHMENT_MAX_COUNT,
        },
        {
          name: IMAGE_FILE,
        },
      ],
      {
        limits: {
          fileSize: ATTACHMENT_MAX_SIZE,
        },
      },
    ),
  )
  @UsePipes(
    new JoiValidationPipe(putCourseValidation),
  )
  public async updateCourse(
    @UploadedFiles() files,
    @Body() dataCourse: UpdateCourseDto,
    @Req() { user },
  ) {

    return this.courseService.updateCourse(dataCourse, files, user);
  }

  @Put('course/:courseId/topics')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course',
  })
  @ApiOperation({ title: 'Update course lessons' })
  @ApiCreatedResponse({
    description: 'Return updated course',
    type: Course,
  })
  @UsePipes(
    new JoiValidationPipe(putCourseTopicsValidation),
  )
  public async updateCourseTopics(
    @Body() courseTopics: UpdateCourseTopicsDto,
    @Param('courseId', new ParseIntPipe()) courseId: number,
    @Req() { user },
  ) {
    return this.courseService.updateCourseTopics(courseId, courseTopics, user);
  }

  @Put('course/topics/:topicId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course',
  })
  @ApiOperation({ title: 'Update course lessons' })
  @ApiCreatedResponse({
    description: 'Return http status',
  })
  @UsePipes(
    new JoiValidationPipe(putCourseTopicsIDValidation),
  )
  public async updateCourseTopicInfo(
    @Body() updateTopicInfo: UpdateTopicInfoDto,
    @Param('topicId', new ParseIntPipe()) topicId: number,
    @Req() { user },
  ) {
    return this.courseService.updateCourseTopicInfo(topicId, updateTopicInfo, user);
  }

  @Put('course/:courseId/tutors')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course',
  })
  @ApiOperation({ title: 'Update course tutors' })
  @ApiCreatedResponse({
    description: 'Return updated course',
    type: Course,
  })
  @UsePipes(
    new JoiValidationPipe(putCourseTutorsValidation),
  )
  public async updateCourseTutors(
    @Body() courseTutors: UpdateCourseTutorsDto,
    @Param('courseId', new ParseIntPipe()) courseId: number,
    @Req() { user },
  ) {
    return this.courseService.updateCourseTutors(courseId, courseTutors, user);
  }

  @Put('course/:courseId/files')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course',
  })
  @ApiOperation({ title: 'Update course files' })
  @ApiCreatedResponse({
    description: 'Return updated course',
    type: Course,
  })
  @UsePipes(
    new JoiValidationPipe(putCourseFilesValidation),
  )
  public async updateCourseFiles(
    @Body() courseFiles: UpdateCourseFilesDto,
    @Param('courseId', new ParseIntPipe()) courseId: number,
    @Req() { user },
  ) {
    return this.courseService.updateCourseFiles(courseId, courseFiles, user);
  }

  @Put('course/status')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'course',
  })
  @ApiOperation({ title: 'Edit status to course' })
  @ApiOkResponse({
    description: 'Returns ok.',
  })
  @UsePipes(
    new JoiValidationPipe(putCourseStatusValidation),
  )
  public async changeStatusCourse(
    @Body() dataStatus: ChangeCourseStatusDto,
    @Req() { user },
  ): Promise<HttpStatus> {
    return this.courseService.changeStatusCourse(dataStatus, user);
  }

  @Put('course/time')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'course',
  })
  @ApiOperation({ title: 'Edit time to course complete' })
  @ApiOkResponse({
    description: 'Returns ok.',
  })
  @UsePipes(
    new JoiValidationPipe(putCourseTimeValidation),
  )
  public async changeTimeCourse(@Body() courseTime: CourseTimeDto): Promise<HttpStatus> {
    return this.courseService.changeTimeCourse(courseTime);
  }

  @Get('course/certificates')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course',
  })
  @ApiOperation({ title: 'Get all certificates' })
  @ApiOkResponse({
    description: 'Return all certificates',
  })
  public async getAllCertificates(): Promise<CourseCertificate[]> {
    return this.courseService.getAllCertificates();
  }

  @Get('course/topics/search')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course',
  })
  @ApiOperation({ title: 'Get found file lessons' })
  @ApiOkResponse({
    description: 'Return found file lessons',
    type: [FileTopics],
  })
  @UsePipes(
    new JoiValidationPipe(getCourseTopicsSearchValidation),
  )
  public async searchCourseTopics(@Query() searchData: CourseTopicsSearchDto) {
    return this.courseService.searchCourseTopics(searchData);
  }

  @Get('course/topics/:topicId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course',
  })
  @ApiOperation({ title: 'Get course lesson' })
  @ApiOkResponse({
    description: 'Return course lesson',
    type: Topic,
  })
  public async getCourseTopicById(
    @Param('topicId', new ParseIntPipe()) topicId: number,
    @Req() { user },
  ) {
    return this.courseService.getCourseTopicById(topicId, user);
  }

  @Get('files/topics/search')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course',
  })
  @ApiOperation({ title: 'Get found file lessons' })
  @ApiOkResponse({
    description: 'Return found file lessons',
    type: [FileTopics],
  })
  @UsePipes(
    new JoiValidationPipe(getFilesTopicsSearchValidation),
  )
  public async searchFileTopics(@Query() searchData: FileTopicsSearchDto): Promise<FileTopics[]> {
    return this.courseService.searchFileTopics(searchData);
  }

  @Get('files/search')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course',
  })
  @ApiOperation({ title: 'Get found files' })
  @ApiOkResponse({
    description: 'Return found files',
    type: [CourseAttachment],
  })
  @UsePipes(
    new JoiValidationPipe(getFilesSearchValidation),
  )
  public async searchFile(@Query() searchData: FilesSearchDto): Promise<CourseAttachment[]> {
    return this.courseService.searchFile(searchData);
  }

  @Put('files/upload/:fileId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course',
  })
  @ApiOperation({ title: 'Edit file' })
  @ApiOkResponse({
    description: 'Return ok',
  })
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(
    new JoiValidationPipe(putFilesUploadValidation),
  )
  public async editUploadFile(
    @Param('fileId', new ParseIntPipe()) fileId: number,
    @UploadedFile() file: FileTemplateDto,
    @Body() uploadData: UploadFileDto,
  ): Promise<CourseAttachment> {
    return this.courseService.editUploadFile(uploadData, file, fileId);
  }

  @Post('files/upload')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course',
  })
  @ApiOperation({ title: 'Get found files' })
  @ApiOkResponse({
    description: 'Return found files',
    type: [CourseAttachment],
  })
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(
    new JoiValidationPipe(postFilesUploadValidation),
  )
  public async uploadFile(
    @UploadedFile() file: FileTemplateDto,
    @Body() uploadData: UploadFileDto,
  ): Promise<CourseAttachment> {
    return this.courseService.uploadFile(uploadData, file);
  }

  @Get('files/:fileId/courses')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course',
  })
  @ApiOperation({ title: 'Get found courses and token' })
  @ApiOkResponse({
    description: 'Return found courses and token',
    type: [],
  })
  public async getCoursesByFile(
    @Param('fileId', new ParseIntPipe()) fileId: number,
  ): Promise<Course[]> {
    return this.courseService.getCoursesByFile(fileId);
  }

  @Get('course/:courseId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course',
  })
  @ApiOperation({ title: 'Get found course by id' })
  @ApiOkResponse({
    description: 'Return found course',
    type: {},
  })
  public async getCourseById(
    @Param('courseId', new ParseIntPipe()) courseId: number,
    @Req() { user }
  ): Promise<Course> {
    return this.courseService.getCourseById(courseId, user);
  }

  @Get('files/:headerId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course',
  })
  @ApiOperation({ title: 'Get found files by header' })
  @ApiOkResponse({
    description: 'Return found files by header',
    type: [],
  })
  @UsePipes(
    new JoiValidationPipe(getFileValidation),
  )
  public async getFilesByHeader(
    @Param('headerId', new ParseIntPipe()) headerId: number,
    @Query() searchData: FilesSearchDto,
  ): Promise<CourseAttachment[]> {
    return this.courseService.getFilesByHeader(headerId, searchData);
  }

  @Delete('files/upload/:fileId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course',
  })
  @ApiOperation({ title: 'Delete file' })
  @ApiOkResponse({
    description: 'Return ok',
  })
  public async deleteUploadFile(
    @Param('fileId', new ParseIntPipe()) fileId: number,
  ): Promise<HttpStatus> {
    return this.courseService.deleteUploadFile(fileId);
  }

  @Post('course/topics')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course',
  })
  @ApiOperation({ title: 'Create topic' })
  @ApiCreatedResponse({
    description: 'Return created topic',
    type: Topic
  })
  @UsePipes(
    new JoiValidationPipe(postCourseTopicsValidation)
  )
  public async createTopic(
    @Body() topicData: CreateTopicDto,
    @Req() { user }
  ) {
    return this.courseService.createTopic(topicData, user);
  }

  @Delete('course/topics/:topicId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course',
  })
  @ApiOperation({ title: 'Delete topic' })
  @ApiOkResponse({
    description: 'Return ok',
  })
  public async deleteTopic(
    @Param('topicId', new ParseIntPipe()) topicId: number,
    @Req() { user }
  ): Promise<HttpStatus> {
    return this.courseService.deleteTopic(topicId, user);
  }
}

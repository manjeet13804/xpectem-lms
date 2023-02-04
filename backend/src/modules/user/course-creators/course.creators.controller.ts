import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  Req, 
  ParseIntPipe, 
  Delete,
  SerializeOptions,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiImplicitFile, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import * as config from 'config';
import * as joi from 'joi';
import { ACGuard, UseRoles } from 'nest-access-control';
import { JoiValidationPipe } from '../../../common/pipes/joi-validation.pipe';
import { RequestSearchCourseCreatorsDto } from './dto/requestSearchCourseCreators.dto';
import { ResponseSearchCourseCreatorsDto } from './dto/responseSearchCourseCreators.dto';
import { CourseCreatorsService } from './course.creators.service';
import { CourseCreatorDto, UpdateCourseCreatorDto, UpdateCourseCreatorResponse } from './dto/CourseCreator.dto';
import { User } from '../../../entity/User';


const MAX_EMAIL_COUNT: number = config.get('user.account.maxEmailCount');
const MAX_PHONE_COUNT: number = config.get('user.account.maxPhoneCount');

@ApiBearerAuth()
@ApiUseTags('admin course creators')
@Controller('admin')
export class CourseCreatorsController {

  constructor(
    private readonly courseCreatorsService: CourseCreatorsService,
  ) { }

  @Get('/course-creator/:id')
  @UseGuards(AuthGuard(), ACGuard)
  @SerializeOptions({ groups: ['course-creator'] })
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course-creator',
  })
  @ApiOperation({ title: 'Search course creator by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CourseCreatorDto,
  })
  public getCourseCreatorById(
    @Param('id', new ParseIntPipe()) creatorId: number,
    @Req() { user }
  ) {
    return this.courseCreatorsService.getById(creatorId, user);
  }

  @Get('/course-creator')
  @UseGuards(AuthGuard(), ACGuard)
  @UsePipes(new JoiValidationPipe({
    firstName: joi.string(),
    lastName: joi.string(),
    email: joi.string(),
    phone: joi.string(),
    isDeactivated: joi.boolean(),
    lmsGroup: joi.number().positive().integer(),
    organisation: joi.number().positive().integer(),
    group: joi.number().positive().integer(),
    personNumber: joi.string(),
    employeeNumber: joi.string(),
  }))
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course-creator',
  })
  @ApiOperation({ title: 'Search by course creators' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponseSearchCourseCreatorsDto,
    isArray: true,
  })
  public getCourseCreators(
    @Query() query: RequestSearchCourseCreatorsDto,
    @Req() { user }
  ) {
    return this.courseCreatorsService.get(query, user);
  }

  @Post('/course-creator')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'course-creator'
  })
  @ApiOperation({ title: 'Create course creator' })
  @ApiResponse({
    description: 'The course creator has been successfully created.',
    status: HttpStatus.CREATED,
  })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', required: true, description: 'Avatar to upload' })
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new JoiValidationPipe({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    isDeactivated: joi.bool().required(),
    emails: joi
      .array()
      .items(joi.string().email())
      .min(1)
      .max(MAX_EMAIL_COUNT)
      .unique()
      .required(),
    phones: joi
      .array()
      .items(joi.string())
      .min(0)
      .unique()
      .max(MAX_PHONE_COUNT),
    language: joi
      .number()
      .positive()
      .integer()
      .required(),
    notifyEmail: joi.boolean().required(),
    notifySms: joi.boolean().required(),
    personNumber: joi.string(),
    employeeNumber: joi.string(),
    groups: joi
      .array()
      .items(
        joi
          .number()
          .positive()
          .integer(),
      )
      .min(1)
      .required()
  }))
  async create(
    @Req() { user }: { user: User },
    @Body() courseCreatorData: CourseCreatorDto,
    @UploadedFile() file,
  ): Promise<HttpStatus> {
    return this.courseCreatorsService.create(courseCreatorData, file, user)
  }

  @Put('/course-creator/:id')
  @UseGuards(AuthGuard(), ACGuard)
  @SerializeOptions({ groups: ['course-creator'] })
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'course-creator'
  })
  @ApiOperation({ title: 'Update course creator' })
  @ApiResponse({
    description: 'The course creator has been successfully updated.',
    status: HttpStatus.OK,
    type: UpdateCourseCreatorDto,
  })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', required: true, description: 'Avatar to upload' })
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new JoiValidationPipe({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    isDeactivated: joi.bool().required(),
    emails: joi
      .array()
      .items(joi.string().email())
      .min(1)
      .max(MAX_EMAIL_COUNT)
      .unique()
      .required(),
    phones: joi
      .array()
      .items(joi.string())
      .min(0)
      .max(MAX_PHONE_COUNT)
      .unique(),
    language: joi
      .number()
      .positive()
      .integer()
      .required(),
    notifyEmail: joi.boolean().required(),
    notifySms: joi.boolean().required(),
    personNumber: joi.string(),
    employeeNumber: joi.string(),
    avatar: joi.string().allow('')
  }))
  async update(
    @Param('id', new ParseIntPipe()) creatorId,
    @Req() { user }: { user: User },
    @Body() courseCreatorData: UpdateCourseCreatorDto,
    @UploadedFile() file,
  ): Promise<UpdateCourseCreatorResponse> {
    return this.courseCreatorsService.update(creatorId, courseCreatorData, file, user)
  }

  @Delete('/course-creator/:id')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course-creator',
  })
  @ApiOperation({ title: 'Mark course creator by id for delete' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return user id',
    type: Number
  })
  public async markUserToDelete(
    @Param('id', new ParseIntPipe()) creatorId,
    @Req() { user }  
  ): Promise<Number> {
    return this.courseCreatorsService.markUserToDelete(creatorId, user);
  }

  @Delete('/course-creator/:id/:courseId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course-creator',
  })
  @ApiOperation({ title: 'Delete course from course creator'})
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return ok'
  })
  async deleteCourseFromCreator(
    @Param('id', new ParseIntPipe()) creatorId,
    @Param('courseId', new ParseIntPipe()) courseId,
    @Req() { user }
  ): Promise<HttpStatus> {
    return this.courseCreatorsService.deleteCourseFromCreator(creatorId, courseId, user)
  }
}

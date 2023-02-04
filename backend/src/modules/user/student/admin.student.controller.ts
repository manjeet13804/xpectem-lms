import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  SerializeOptions,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiImplicitFile,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import * as config from 'config';
import { Response } from 'express';
import * as joi from 'joi';
import { ACGuard, UseRoles } from 'nest-access-control';
import * as path from 'path';

import { JoiValidationPipe } from '../../../common/pipes/joi-validation.pipe';
import { Tools } from '../../../common/tools/tools';
import { NotesUsers } from '../../../entity/NotesUsers';
import { User } from '../../../entity/User';
import { CourseStudent } from '../../course/course-student.entity';
import { UploadService } from '../../upload/upload.service';
import {
  AddNoteDto, AddStudentDto,
  AddStudentsDto,
  ImportStudentDto,
  SearchStudentsDto,
  UpdateStudentsDto,
  GetExampleFileDto,
} from './dto/studentDto';
import { importStudentsFile } from './joi/joi.validation';
import { StudentService } from './student.service';

const MAX_EMAIL_COUNT: number = config.get('user.account.maxEmailCount');
const MAX_PHONE_COUNT: number = config.get('user.account.maxPhoneCount');
const MAX_STUDENTS_COUNT: number = config.get('group.maxStudentsCountGroup');
const ALLOWED_AVATAR_MIMETYPES: string[] = config.get('user.account.avatarMimetype');
const ALLOWED_AVATAR_MAX_SIZE: number = config.get('user.account.avatarMaxSize');

@ApiBearerAuth()
@ApiUseTags('admin student')
@Controller('admin')
export class AdminStudentController {
  constructor(
    private studentService: StudentService,
    private uploadService: UploadService,
    private tools: Tools,
  ) { }

  @Post('/students')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Create students' })
  @ApiResponse({
    description: 'The record has been successfully created.',
    status: HttpStatus.OK,
    type: AddStudentDto,
  })
  @ApiResponse({
    description: 'Validation error',
    status: HttpStatus.BAD_REQUEST,
  })
  @UsePipes(
    new JoiValidationPipe({
      students: joi
        .array()
        .items({
          firstName: joi.string().required(),
          lastName: joi.string().required(),
          emails: joi
            .array()
            .items(joi.string().email())
            .min(1)
            .max(MAX_EMAIL_COUNT)
            .required(),
          phones: joi
            .array()
            .items(joi.string())
            .min(0)
            .max(MAX_PHONE_COUNT),
          language: joi
            .number()
            .positive()
            .integer()
            .required(),
          notifyEmail: joi.boolean().required(),
          notifySms: joi.boolean().required(),
          streetAddress: joi.string().allow(''),
          note: joi.string(),
          studentTaxonomy: joi.array().items({
            id: joi.number(),
            value: joi.string().allow(null),
            taxonomy: joi.object().keys({
              id: joi.number(),
              format: joi.string(),
              mandatory: joi.boolean(),
              title: joi.string(),
            })
          }),
        })
        .max(MAX_STUDENTS_COUNT)
        .required(),
      courses: joi
        .array()
        .items({
          courseId: joi
            .number()
            .positive()
            .integer()
            .required(),
          dateBegin: joi.date(),
        })
        .required(),
      groups: joi
        .array()
        .items(
          joi
            .number()
            .positive()
            .integer(),
        )
        .min(1)
        .required(),
    }),
  )
  async create(
    @Req() { user },
    @Body() studentsData: AddStudentsDto,
  ) {
    return this.studentService.createStudents(studentsData, user);
  }

  @Put('/student/:id')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Update student' })
  @ApiResponse({
    description: 'The record has been successfully updated.',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Validation error',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', description: 'File to upload' })
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(
    new JoiValidationPipe({
      student: joi.object().keys({
        firstName: joi.string(),
        avatar: joi.string().allow(''),
        lastName: joi.string(),
        emails: joi
          .array()
          .items(joi.string().email())
          .min(0)
          .max(MAX_EMAIL_COUNT),
        phones: joi
          .array()
          .items(joi.string())
          .min(0)
          .max(MAX_PHONE_COUNT),
        language: joi
          .number()
          .positive()
          .integer(),
        notifyEmail: joi.boolean(),
        notifySms: joi.boolean(),
        personNumber: joi.string(),
        employeeNumber: joi.string(),
        note: joi.string().allow(''),
        streetAddress: joi.string().allow(''),
        studentTaxonomy: joi.array().items({
          id: joi.number(),
          value: joi.string().allow(null),
          taxonomy: joi.object().keys({
            id: joi.number(),
            format: joi.string(),
            mandatory: joi.boolean(),
            title: joi.string(),
          })
        }),
        lmsGroupId: joi.number(),
      }),
      courses: joi
        .array()
        .items({
          courseId: joi
            .number()
            .positive()
            .integer(),
          dateEnd: joi.date(),
          dateBegin: joi.date(),
          coursePassed: joi.boolean(),
        })
        .required(),
      newCourses: joi
        .array()
        .items({
          courseId: joi
            .number()
            .positive()
            .integer()
            .required(),
          dateBegin: joi.date(),
        })
    }),
  )
  async update(
    @Param('id', new ParseIntPipe()) studentId,
    @Body() newStudentsData: UpdateStudentsDto,
    @UploadedFile() file,
    @Req() { user },
  ): Promise<HttpStatus> {
    if (file) {
      this.tools.checkFileValid(file, ALLOWED_AVATAR_MIMETYPES, ALLOWED_AVATAR_MAX_SIZE);
    }

    const uploadResult = file ? await this.uploadService.upload(file, 'avatars') : null;
    const urlAvatar = uploadResult ? uploadResult.url : undefined;

    return this.studentService.updateProfile(studentId, newStudentsData, urlAvatar, user);
  }

  @Get('/students')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Get students by filter' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return filtered students',
    type: [User],
  })
  @UsePipes(
    new JoiValidationPipe({
      firstName: joi.string(),
      lastName: joi.string(),
      email: joi.string(),
      phone: joi.string(),
      personNumber: joi.string(),
      employeeNumber: joi.string(),
      isDeactivated: joi.boolean(),
    }),
  )
  public async getAllStudents(
    @Query() query: SearchStudentsDto,
    @Req() { user },
  ): Promise<User[]> {
    return this.studentService.getStudents(query, user);
  }

  @Get('/student/:id')
  @UseGuards(AuthGuard(), ACGuard)
  @SerializeOptions({ groups: ['admin-student'] })
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Get one student by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return found student',
    type: User,
  })
  public async getOneStudent(
    @Param('id', new ParseIntPipe()) studentId: number,
    @Req() { user },
  ): Promise<User> {
    return this.studentService.getOneStudent(studentId, user);
  }

  @Post('/students/import/check-file')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({
    title: 'Check import file',
    description: 'Supported formats: .csv, .xls, .xlsx',
  })
  @ApiResponse({
    description: 'File is corrected.',
    status: HttpStatus.OK,
  })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({
    name: 'file',
    required: true,
    description: 'List of users',
  })
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(
    new JoiValidationPipe({
      headers: joi
        .array()
        .items(joi.string())
        .required(),
      groups: joi
        .array()
        .items(
          joi
            .number()
            .positive()
            .integer(),
        )
        .unique()
        .min(1)
        .required(),
    }),
  )
  async checkFileForImport(
    @UploadedFile() file,
    @Req() { user },
    @Body() importData: ImportStudentDto,
  ): Promise<HttpStatus> {
    if (!file) {
      throw new BadRequestException('The file does not exist');
    }

    return this.studentService.checkImportFile(file, importData);
  }

  @Post('/students/import')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({
    title: 'Import users from file',
    description: 'Supported formats: .csv, .xls, .xlsx',
  })
  @ApiResponse({
    description: 'Records has been successfully created.',
    status: HttpStatus.OK,
  })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({
    name: 'file',
    required: true,
    description: 'List of users',
  })
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(
    new JoiValidationPipe(importStudentsFile),
  )
  async import(
    @UploadedFile() file,
    @Req() { user },
    @Body() importData: ImportStudentDto,
  ): Promise<AddStudentDto> {
    if (!file) {
      throw new BadRequestException('The file does not exist');
    }

    return this.studentService.importStudents(file, user, importData);
  }

  @Get('/students/template/download')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Download template for import group students' })
  @ApiResponse({
    description: 'return template.',
    status: HttpStatus.OK,
  })
  @UsePipes(
    new JoiValidationPipe({
      groupId: joi.number(),
    }),
  )
  public async downloadTemplate(@Res() res: Response, @Query() query: GetExampleFileDto,): Promise<void> {
    return this.studentService.downloadExampleFile(res, query);
  }

  @Post('/student/:id/note')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Create note about student' })
  @ApiResponse({
    description: 'The record has been successfully created.',
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    description: 'Validation error',
    status: HttpStatus.BAD_REQUEST,
  })
  @UsePipes(
    new JoiValidationPipe({
      note: joi.string().required(),
    }),
  )
  async createNoteStudent(
    @Param('id', new ParseIntPipe()) studentId: number,
    @Body() { note }: AddNoteDto,
    @Req() { user },
  ): Promise<HttpStatus> {
    return this.studentService.createNoteStudent(studentId, note, user);
  }

  @Get('/student/:id/note')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Get note about student' })
  @ApiResponse({
    description: 'Return note about student',
    status: HttpStatus.OK,
    type: NotesUsers,
  })
  @ApiResponse({
    description: 'Validation error',
    status: HttpStatus.BAD_REQUEST,
  })
  async getNoteStudent(
    @Param('id', new ParseIntPipe()) studentId: number,
    @Req() { user },
  ): Promise<NotesUsers> {
    return this.studentService.getNoteStudent(studentId, user);
  }

  @Delete('/student/:id/:courseId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Delete student from course' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return deleted course id.',
  })
  public async deleteStudentFromCourse(
    @Param('id', new ParseIntPipe()) studentId,
    @Param('courseId', new ParseIntPipe()) courseId,
    @Req() { user },
  ): Promise<number> {
    return this.studentService.deleteStudentFromCourse(studentId, courseId, user);
  }

  @Delete('/student/:id')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Mark student by id for delete' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return ok',
  })
  public async markUserToDelete(
    @Param('id', new ParseIntPipe()) studentId: number,
    @Req() { user },
  ): Promise<HttpStatus> {
    return this.studentService.markUserToDelete(studentId, user);
  }

  @Get('/student/:studentId/course/:courseId')
  @UseGuards(AuthGuard(), ACGuard)
  @SerializeOptions({ groups: ['admin-student'] })
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Get student course' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return course',
    type: CourseStudent,
  })
  public async getStudentCourse(
    @Param('studentId', new ParseIntPipe()) studentId: number,
    @Param('courseId', new ParseIntPipe()) courseId: number,
    @Req() { user },
  ): Promise<CourseStudent> {
    return this.studentService.getStudentCourse(studentId, courseId, user);
  }

  @Post('/student/add-existing')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Update existing students' })
  @ApiResponse({
    description: 'Existed students have been updated.',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Validation error',
    status: HttpStatus.BAD_REQUEST,
  })
  @UsePipes(
    new JoiValidationPipe({
      studentsToUpdate: joi
        .array()
        .items(
          joi.object({
            courses: joi
              .array()
              .items(
                {
                  courseId: joi
                    .number()
                    .positive()
                    .integer()
                    .required(),
                  dateBegin: joi.date(),
                }
              )
              .unique()
              .required(),
            email: joi
              .string()
              .required(),
          })
        )
    }),
  )
  public async addExistingStudentsToCourses(
    @Body() body: AddStudentDto,
  ): Promise<HttpStatus> {
    return this.studentService.addExistingStudentsToCourses(body);
  }
}

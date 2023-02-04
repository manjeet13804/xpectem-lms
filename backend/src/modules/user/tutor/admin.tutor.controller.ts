import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  SerializeOptions,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  Delete,
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
import * as joi from 'joi';
import { ACGuard, UseRoles } from 'nest-access-control';

import { User } from '../../../entity/User';
import { JoiValidationPipe } from '../../../common/pipes/joi-validation.pipe';
import { Tools } from '../../../common/tools/tools';
import { UploadService } from '../../upload/upload.service';
import { AdminTutorService } from './admin.tutor.service';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { SearchTutorDto } from './dto/search-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';

const MAX_EMAIL_COUNT: number = config.get('tutor.account.maxEmailCount');
const MAX_PHONE_COUNT: number = config.get('tutor.account.maxPhoneCount');
const ALLOWED_AVATAR_MIME_TYPES: string[] = config.get('tutor.account.avatarMimeType');
const ALLOWED_AVATAR_MAX_SIZE: number = config.get('tutor.account.avatarMaxSize');

@ApiBearerAuth()
@ApiUseTags('admin tutor')
@Controller('admin/tutors')
export class AdminTutorController {
  constructor(
    public adminTutorService: AdminTutorService,
    private uploadService: UploadService,
    private tools: Tools,
  ) {}

  @Post()
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'tutor',
  })
  @ApiOperation({ title: 'Create tutor' })
  @ApiResponse({
    description: 'The tutor has been successfully created.',
    status: HttpStatus.CREATED,
  })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', required: true, description: 'Avatar to upload' })
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new JoiValidationPipe({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.array().items(joi.string().email()).min(1).max(MAX_EMAIL_COUNT).required(),
    phone: joi.array().items(joi.string()).max(MAX_PHONE_COUNT),
    coursesIds: joi.array().items(joi.number().positive().integer()).unique().default([]),
    language: joi.number().positive().integer().required(),
    notifyEmail: joi.boolean().required(),
    notifySms: joi.boolean().required(),
    isDeactivated: joi.boolean().required(),
  }))
  public async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateTutorDto,
    @Req() { user }: Request & { user: User },
  ) {
    if (file) {
      this.tools.checkFileValid(file, ALLOWED_AVATAR_MIME_TYPES, ALLOWED_AVATAR_MAX_SIZE);

      const { url } = await this.uploadService.upload(file, 'avatars');

      return this.adminTutorService.create(user, body, url);
    }

    return this.adminTutorService.create(user, body);
  }

  @Get()
  @SerializeOptions({ groups: ['admin-tutor'] })
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'tutor',
  })
  @ApiOperation({ title: 'Search tutors' })
  @ApiResponse({
    description: 'Tutors found successfully. Get tutor.',
    status: HttpStatus.OK,
    type: [User],
  })
  @UsePipes(new JoiValidationPipe({
    firstName: joi.string(),
    lastName: joi.string(),
    email: joi.string(),
    phone: joi.string(),
    personNumber: joi.string(),
    employeeNumber: joi.string(),
    isDeactivated: joi.boolean(),
  }))
  public async search(
    @Query() query: SearchTutorDto,
  ) {
    return this.adminTutorService.search(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard(), ACGuard)
  @SerializeOptions({ groups: ['admin-tutor'] })
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'tutor',
  })
  @ApiOperation({ title: 'Get tutor profile' })
  @ApiResponse({
    description: 'return user.',
    status: HttpStatus.OK,
    type: User,
  })
  public async get(
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return this.adminTutorService.get(id);
  }

  @Put(':id')
  @SerializeOptions({ groups: ['admin-tutor'] })
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'tutor',
  })
  @ApiOperation({ title: 'Update tutor' })
  @ApiResponse({
    description: 'The tutor has been successfully updated.',
    status: HttpStatus.OK,
  })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', required: true, description: 'File to upload' })
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new JoiValidationPipe({
    firstName: joi.string(),
    lastName: joi.string(),
    email: joi.array().items(joi.string().email()).min(1).max(MAX_EMAIL_COUNT),
    phone: joi.array().items(joi.string().allow('')).min(0).max(MAX_PHONE_COUNT).default([]),
    coursesIds: joi.array().items(joi.number().positive().integer()).unique().default([]),
    language: joi.number().positive().integer(),
    notifyEmail: joi.boolean(),
    notifySms: joi.boolean(),
    isDeactivated: joi.boolean(),
  }))
  public async updateUser(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateTutorDto,
    @Param('id', new ParseIntPipe()) id: number,
    @Req() { user }: Request & { user: User },
  ) {
    if (file) {
      this.tools.checkFileValid(file, ALLOWED_AVATAR_MIME_TYPES, ALLOWED_AVATAR_MAX_SIZE);

      const { url } = await this.uploadService.upload(file, 'avatars');

      return this.adminTutorService.update(user, id, body, url);
    }

    return this.adminTutorService.update(user, id, body);
  }

  @Delete(':id')
  @SerializeOptions({ groups: ['admin-tutor'] })
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'delete',
    possession: 'any',
    resource: 'tutor',
  })
  @ApiOperation({ title: 'Remove tutor' })
  @ApiResponse({
    description: 'The tutor has been successfully removed.',
    status: HttpStatus.OK,
  })
  public async removeUser(
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return this.adminTutorService.remove(id);
  }
}

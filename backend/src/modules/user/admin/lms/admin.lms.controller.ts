import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiImplicitFile,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import * as config from 'config';
import * as joi from 'joi';
import { ACGuard, UseRoles } from 'nest-access-control';

import { User } from '../../../../entity/User';
import { CreateAdminDto, 
  SearchAdminDto, 
  AddExistingAdminDto,
  CreateLmsAdminDto,
} from '../../dto/admin.dto';
import { AdminService } from '../admin.service';
import { JoiValidationPipe } from './../../../../common/pipes/joi-validation.pipe';
import { Tools } from './../../../../common/tools/tools';
import { UserRole } from './../../../../entity/User';
import { UploadService } from './../../../upload/upload.service';
import { AdminLmsService } from './admin.lms.service';
import { addExistingAdminSchema } from '../joi/joi.validation'

const MAX_EMAIL_COUNT: number = config.get('user.account.maxEmailCount');
const MAX_PHONE_COUNT: number = config.get('user.account.maxPhoneCount');
const ALLOWED_AVATAR_MIMETYPES: string[] = config.get('user.account.avatarMimetype');
const ALLOWED_AVATAR_MAX_SIZE: number = config.get('user.account.avatarMaxSize');

@ApiBearerAuth()
@ApiUseTags('admin lms administration')
@Controller('admin/admin-lms')
export class AdminLmsController {

  constructor(
    public adminLmsService: AdminLmsService,
    private uploadService: UploadService,
    private tools: Tools,
    private adminService: AdminService,
  ) { }

  @Post()
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'admin-lms',
  })
  @ApiOperation({ title: 'Create lms group administrator ' })
  @ApiResponse({
    description: 'The record has been successfully created.',
    status: HttpStatus.OK,
  })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', required: true, description: 'File to upload' })
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new JoiValidationPipe({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.array().items(joi.string().email()).min(1).max(MAX_EMAIL_COUNT).required(),
    phone: joi.array().items(joi.string()).min(1).max(MAX_PHONE_COUNT),
    language: joi.number().positive().integer().required(),
    notifyEmail: joi.boolean().required(),
    notifySms: joi.boolean().required(),
    lmsGroup: joi.number().positive().integer().required(),
    isDeactivated: joi.boolean().required(),
  }))
  public async createUser(
    @UploadedFile() file,
    @Body() body: CreateLmsAdminDto,
    @Req() requestData,
  ) {
    const { user } = requestData;
    
    if (file) {
      this.tools.checkFileValid(file, ALLOWED_AVATAR_MIMETYPES, ALLOWED_AVATAR_MAX_SIZE);
    }

    const uploadResult = file
      ? await this.uploadService.upload(file, 'avatars')
      : null;

    const createData = uploadResult
      ? {
        user,
        ...body,
        avatar: uploadResult.url,
      }
      : {
        user,
        ...body,
      };

    return this.adminLmsService.createAdmin(createData);
  }

  @Put('add-existing-admin')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'admin-lms',
  })
  @ApiOperation({ title: 'Add lms group to existing administrator ' })
  @ApiResponse({
    description: 'The record has been successfully created.',
    status: HttpStatus.OK,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new JoiValidationPipe(addExistingAdminSchema))
  public async addExistingUser(
    @Body() body: AddExistingAdminDto,
  ) : Promise<HttpStatus> {
    return this.adminLmsService.addExistingAdmin({ ...body })
  }

  @Get('search')
  @SerializeOptions({ groups: ['admin-search'] })
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'admin-lms',
  })
  @ApiOperation({ title: 'Search lms group administrator' })
  @ApiResponse({
    description: 'Administrators found successfully. Get lms administrators.',
    status: HttpStatus.OK,
    type: [User],
  })
  @UsePipes(new JoiValidationPipe({
    firstName: joi.string(),
    lastName: joi.string(),
    email: joi.string(),
    phone: joi.string(),
    isDeactivated: joi.boolean().default(false),
    lmsGroup: joi.number().positive().integer(),
  }))
  public async searchUser(
    @Query() query: SearchAdminDto,
  ) {
    return this.adminLmsService.searchAdmin(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard(), ACGuard)
  @SerializeOptions({ groups: ['admin-profile'] })
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'admin-lms',
  })
  @ApiOperation({ title: 'Get lms group administrator' })
  @ApiResponse({
    description: 'return user.',
    status: HttpStatus.OK,
    type: User,
  })
  public async getUser(
    @Param('id', new ParseIntPipe()) param: number,
  ) {
    return this.adminLmsService.getAdminById(param);
  }

  @Put(':id')
  @SerializeOptions({ groups: ['admin-profile'] })
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'admin-lms',
  })
  @ApiOperation({ title: 'Update lms group administrator ' })
  @ApiResponse({
    description: 'The record has been successfully updated.',
    status: HttpStatus.OK,
  })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', required: true, description: 'File to upload' })
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new JoiValidationPipe({
    firstName: joi.string(),
    lastName: joi.string(),
    email: joi.array().items(joi.string().email()).min(1).max(MAX_EMAIL_COUNT),
    phone: joi.array().items(joi.string().allow('')).min(0).max(MAX_PHONE_COUNT),
    language: joi.number().positive().integer(),
    notifyEmail: joi.boolean(),
    notifySms: joi.boolean(),
    avatar: joi.string(),
    isDeactivated: joi.boolean().default(false),
  }))
  public async updateUser(
    @UploadedFile() file,
    @Body() body: CreateAdminDto,
    @Param('id', new ParseIntPipe()) id: number,
    @Req() requestData,
  ) {
    const { user } = requestData;

    return this.adminLmsService.updateAdmin(id, body, file, user);
  }

  @Put(':id/close')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'own',
    resource: 'admin-lms',
  })
  @ApiOperation({ title: 'Close lms administrator account' })
  @ApiResponse({
    description: 'Close lms administrator account',
    status: HttpStatus.OK,
  })
  @ApiNotFoundResponse({
    description: 'The user was not fount',
  })
  public async closeUserAccount(
    @Req() requestData,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    const { user } = requestData;
    const closeResult = await this.adminService.closeUserAccount(id, UserRole.ADMIN_LMS, user);

    if (!closeResult.raw.affectedRows) {
      throw new NotFoundException('The user was not found');
    }

    return HttpStatus.OK;
  }

}

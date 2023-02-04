import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  NotFoundException,
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
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import * as config from 'config';
import { Response } from 'express';
import * as joi from 'joi';
import { ACGuard, UseRoles } from 'nest-access-control';
import * as path from 'path';

import { User } from '../../../../entity/User';
import { CreateAdminDto, SearchAdminDto } from '../../dto/admin.dto';
import { AdminService } from '../admin.service';
import { JoiValidationPipe } from './../../../../common/pipes/joi-validation.pipe';
import { Tools } from './../../../../common/tools/tools';
import { UserRole } from './../../../../entity/User';
import { UploadService } from './../../../upload/upload.service';
import { ImportAdminDto } from './../../dto/admin.dto';
import { AdminOrganisationService } from './admin.organisation.service';
import { createAdminOrganizationSchema } from '../joi/joi.validation'

const MAX_EMAIL_COUNT: number = config.get('user.account.maxEmailCount');
const MAX_PHONE_COUNT: number = config.get('user.account.maxPhoneCount');
const ALLOWED_AVATAR_MIMETYPES: string[] = config.get('user.account.avatarMimetype');
const ALLOWED_AVATAR_MAX_SIZE: number = config.get('user.account.avatarMaxSize');
const ALLOWED_MIMETYPE_TO_ADMIN_IMPORT: string[] = config.get('administrator.import.allowedMimeTypes');
const ALLOWED_MAX_SIZE_TO_ADMIN_IMPORT: number = config.get('administrator.import.allowedMaxSize');
const ALLOWED_HEADERS_TO_ADMIN_IMPORT: string[] = config.get('administrator.import.allowedHeaders');
const TEMPLATE_TO_DOWNLOAD_PATH: string = config.get('administrator.import.templateToDownloadPath');

@ApiBearerAuth()
@ApiUseTags('admin organisation administration')
@Controller('admin/admin-organisation')
export class AdminOrganisationController {

  constructor(
    public adminOrganisationService: AdminOrganisationService,
    private uploadService: UploadService,
    private tools: Tools,
    private adminService: AdminService,
  ) { }

  @Post()
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'admin-organisation',
  })
  @ApiOperation({ title: 'Create organisation administrator ' })
  @ApiResponse({
    description: 'The record has been successfully created.',
    status: HttpStatus.OK,
  })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', description: 'File to upload' })
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new JoiValidationPipe(createAdminOrganizationSchema))
  public async createUser(
    @UploadedFile() file,
    @Body() body: CreateAdminDto,
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

    return this.adminOrganisationService.createAdmin(createData);
  }

  @Get('search')
  @SerializeOptions({ groups: ['admin-search'] })
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'admin-organisation',
  })
  @ApiOperation({ title: 'Search organisation administrator' })
  @ApiResponse({
    description: 'Administrators found successfully. Get organisation administrators.',
    status: HttpStatus.OK,
    type: [User],
  })
  @UsePipes(new JoiValidationPipe({
    firstName: joi.string(),
    lastName: joi.string(),
    email: joi.string(),
    phone: joi.string(),
    isDeactivated: joi.boolean(),
    lmsGroup: joi.number().positive().integer(),
    organisation: joi.number().positive().integer(),
  }))
  public async searchUser(
    @Query() query: SearchAdminDto,
    @Req() { user }
  ) {
    return this.adminOrganisationService.searchAdmin(query, user);
  }

  @Get(':id')
  @UseGuards(AuthGuard(), ACGuard)
  @SerializeOptions({ groups: ['admin-profile'] })
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'admin-organisation',
  })
  @ApiOperation({ title: 'Get organisation administrator' })
  @ApiResponse({
    description: 'return user.',
    status: HttpStatus.OK,
    type: User,
  })
  public async getUser(
    @Param('id', new ParseIntPipe()) param: number,
    @Req() { user }
  ) {
    return this.adminOrganisationService.getAdminById(param, user);
  }

  @Put(':id')
  @SerializeOptions({ groups: ['admin-profile'] })
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'admin-organisation',
  })
  @ApiOperation({ title: 'Update organisation administrator ' })
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
    phone: joi.array().items(joi.string().min(1)).max(MAX_PHONE_COUNT),
    language: joi.number().positive().integer(),
    notifyEmail: joi.boolean(),
    notifySms: joi.boolean(),
    organisations: joi.array().items(joi.number().positive().integer()).min(1),
    avatar: joi.string().allow('').default('')
  }))
  public async updateUser(
    @UploadedFile() file,
    @Body() body: CreateAdminDto,
    @Param('id', new ParseIntPipe()) id: number,
    @Req() requestData,
  ) {
    const { user } = requestData;

    if (file) {
      this.tools.checkFileValid(file, ALLOWED_AVATAR_MIMETYPES, ALLOWED_AVATAR_MAX_SIZE);
    }

    const uploadResult = file
      ? await this.uploadService.upload(file, 'avatars')
      : { url: null };

    const updateData = {
        user,
        ...body,
        avatar: uploadResult.url || body.avatar,
      }

    return this.adminOrganisationService.updateAdmin(id, updateData);
  }

  @Put(':id/close')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'own',
    resource: 'admin-organisation',
  })
  @ApiOperation({ title: 'Close organisation administrator account' })
  @ApiResponse({
    description: 'Close organisation administrator account',
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
    const closeResult = await this.adminService.closeUserAccount(id, UserRole.ADMIN_ORGANISATION, user);

    if (!closeResult.raw.affectedRows) {
      throw new NotFoundException('The user was not found');
    }

    return HttpStatus.OK;
  }

  @Post('import')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'admin-organisation',
  })
  @ApiOperation({
    title: 'Import organistaion administrator from file',
    description: 'Supported format: .csv',
  })
  @ApiResponse({
    description: 'Records has been successfully created.',
    status: HttpStatus.OK,
  })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', required: true, description: 'List of users' })
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new JoiValidationPipe({
    headers: joi.array().items(joi.string().valid(ALLOWED_HEADERS_TO_ADMIN_IMPORT)).length(7).required(),
    organisations: joi.array().items(joi.number().positive()).min(1).required(),
  }))
  public async  importUser(
    @UploadedFile() file,
    @Body() body: ImportAdminDto,
    @Req() requestData,
  ) {
    const { user } = requestData;

    if (!file) {
      throw new BadRequestException('The file does not exist');
    }

    this.tools.checkFileValid(file, ALLOWED_MIMETYPE_TO_ADMIN_IMPORT, ALLOWED_MAX_SIZE_TO_ADMIN_IMPORT);

    return this.adminOrganisationService.importAdmin(file, body, user);
  }

  @Get('template/download')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'admin-organisation',
  })
  @ApiOperation({ title: 'Download template for import organisation administrators' })
  @ApiResponse({
    description: 'return template.',
    status: HttpStatus.OK,
  })
  public async downloadTemplate(
    @Res() res: Response,
  ) {
    const fullPath = path.resolve(TEMPLATE_TO_DOWNLOAD_PATH);
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
    res.download(fullPath, 'import_administrators_template.csv', (e) => {

      if (e) {
        Logger.error(e);
        res.status(500).send(e);
      }
    });
  }
}

import {
  BadRequestException,
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
  ApiImplicitParam,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import * as config from 'config';
import * as joi from 'joi';
import { ACGuard, UseRoles } from 'nest-access-control';

import { checkFileRestrictions } from '../../../lib/tools';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import { UploadService } from '../upload/upload.service';
import { CreateLmsGroupDto, GetAllLmsGroupDto, UpdateLmsGroupDto } from './dto/lms-group.dto';
import { LmsGroupService } from './lms-group.service';
import { LmsAdminAccessInterceptor } from '../../common/interceptors/lmsAdmin.interceptor';
import {IGetWelcome} from "./lms-group.interface";
import {LmsGroup} from "../../entity/LmsGroup";

const {
  logotypeMaxSize: ALLOWED_LOGO_MAX_SIZE,
  logotypeMimetypes: ALLOWED_LOGO_MIMETYPES,
} = config.get('lmsGroup.restrictions');

@ApiBearerAuth()
@ApiUseTags('admin lms-group')
@Controller('admin/lms-group')
export class LmsGroupController {

  constructor(
    private lmsGroupService: LmsGroupService,
    private uploadService: UploadService,
  ) { }

  @Get()
  @SerializeOptions({ groups: ['admin-lms-group'] })
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'lms-group',
  })
  @ApiOperation({ title: 'Get LMS groups' })
  @ApiResponse({
    description: 'Returns all LMS groups',
    status: HttpStatus.OK,
  })
  @UsePipes(new JoiValidationPipe({
    onlyActive: joi.boolean(),
    name: joi.string().trim(),
    createdAt: joi.date().iso(),
  }))
  public async findAll(
    @Query() query: GetAllLmsGroupDto,
  ) {
    return this.lmsGroupService.findAll(query);
  }

  @Get(':id')
  @SerializeOptions({ groups: ['admin-lms-group'] })
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'own',
    resource: 'lms-group',
  })
  @ApiOperation({ title: 'Get LMS group' })
  @ApiResponse({
    description: 'Returns LMS group',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'LMS group is not found',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiImplicitParam({
    name: 'id',
    type: Number,
  })
  public async getFullLmsGroup(
    @Param('id', new ParseIntPipe()) id,
    @Req() { user }
  ) {

    return this.lmsGroupService.getFull(id, user);
  }

  @Get(':id/welcome')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'own',
    resource: 'lms-group',
  })
  @ApiOperation({ title: 'Get LMS group welcome info' })
  @ApiResponse({
    description: 'Returns LMS group welcome info.',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'LMS group is not found',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiImplicitParam({
    name: 'id',
    type: Number,
  })
  public async getWelcome(
    @Param('id', new ParseIntPipe()) id,
  ): Promise<IGetWelcome> {
    return this.lmsGroupService.getWelcome(id);
  }

  @Post()
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'lms-group',
  })
  @ApiOperation({ title: 'Create lms group' })
  @ApiResponse({
    description: 'The record has been successfully created.',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Already exists an lms group registered with the same name',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', required: false, description: 'File to upload' })
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new JoiValidationPipe({
    name: joi.string().required(),
    translations: joi.array().items(joi.object().keys({
      language: joi.number().min(1).integer(),
      description: joi.string().trim(),
      adminWelcomeText: joi.string().trim(),
      studentWelcomeText: joi.string().trim(),
    })),
    orderEmails: joi.array().items(joi.string().email()),
    accessExpireAt: joi.date().iso().required(),
    maxLmsGroupAdmins: joi.number().min(1).required(),
    maxOrganisations: joi.number().min(1).required(),
    maxOrganisationAdmins: joi.number().min(1).required(),
    maxCourses: joi.number().min(1).required(),
    maxStudents: joi.number().min(1).required(),
    maxLmsGroupAdminsSetting: joi.number().min(1).required(),
    maxOrganisationsSetting: joi.number().min(1).required(),
    maxOrganisationAdminsSetting: joi.number().min(1).required(),
    maxCoursesSetting: joi.number().min(1).required(),
    maxStudentsSetting: joi.number().min(1).required(),
    isActive: joi.boolean().required(),
    notifySms: joi.boolean().required(),
    hasAccessToMmc: joi.boolean().required(),
  }))
  public async create(
    @UploadedFile() file,
    @Body() lmsGroupData: CreateLmsGroupDto,
    @Req() requestData,
  ): Promise<LmsGroup>{
    const { user } = requestData;

    if (file) {
      await checkFileRestrictions(file, {
        maxSize: ALLOWED_LOGO_MAX_SIZE,
        mimetypes: ALLOWED_LOGO_MIMETYPES,
      });
    }

    await this.lmsGroupService.checkExistingLmsGroup(lmsGroupData.name);

    const uploadResult = file
      ? await this.uploadService.upload(file, 'logotypes/lms-group')
      : null;

    const fullLmsGroupData = {
      ...lmsGroupData,
      logoImageUri: uploadResult ? uploadResult.url : null,
    };

    return this.lmsGroupService.create(fullLmsGroupData, user);
  }

  @Put(':id')
  @SerializeOptions({ groups: ['admin-lms-group'] })
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'lms-group',
  })
  @ApiOperation({ title: 'Update lms group' })
  @ApiResponse({
    description: 'The record has been successfully updated.',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Already exists an lms group registered with the same name',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiImplicitParam({
    name: 'id',
    type: Number,
  })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', required: false, description: 'File to upload' })
  @UseInterceptors(FileInterceptor('file'), LmsAdminAccessInterceptor)
  @UsePipes(new JoiValidationPipe({
    name: joi.string(),
    translations: joi.array().items(joi.object().keys({
      language: joi.number().min(1).integer(),
      description: joi.string().trim(),
      adminWelcomeText: joi.string().trim(),
      studentWelcomeText: joi.string().trim(),
    })),
    orderEmails: joi.array().items(joi.string().email()),
    accessExpireAt: joi.date().iso(),
    maxLmsGroupAdmins: joi.number().integer().positive(),
    maxOrganisations: joi.number().integer().positive(),
    maxOrganisationAdmins: joi.number().integer().positive(),
    maxCourses: joi.number().integer().positive(),
    maxStudents: joi.number().integer().positive(),
    isActive: joi.boolean(),
    notifySms: joi.boolean(),
    hasAccessToMmc: joi.boolean(),
    logoImageUri: joi.string(),
  }))
  public async update(
    @UploadedFile() file,
    @Body() lmsGroupData: UpdateLmsGroupDto,
    @Param('id', new ParseIntPipe()) id: number,
    @Req() requestData,
  ): Promise<LmsGroup> {
    const { user } = requestData;

    await checkFileRestrictions(file, {
      maxSize: ALLOWED_LOGO_MAX_SIZE,
      mimetypes: ALLOWED_LOGO_MIMETYPES,
    });

    await this.lmsGroupService.checkExistingLmsGroup(lmsGroupData.name, id);

    return this.lmsGroupService.update(id, user, file, lmsGroupData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'delete',
    possession: 'any',
    resource: 'lms-group',
  })
  @ApiOperation({ title: 'Delete lms group' })
  @ApiResponse({
    description: 'The record has been successfully deleted.',
    status: HttpStatus.OK,
  })
  @ApiImplicitParam({
    name: 'id',
    type: Number,
  })
  public async delete(
    @Param('id', new ParseIntPipe()) id,
  ): Promise<HttpStatus> {
    return this.lmsGroupService.delete(id);
  }

}

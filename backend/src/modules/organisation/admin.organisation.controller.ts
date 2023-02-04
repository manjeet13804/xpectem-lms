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
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
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

import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import { UploadService } from '../upload/upload.service';
import { checkFileRestrictions } from './../../../lib/tools';
import { AdminCreateOrganisationDto, AdminUpdateOrganisationDto } from './dto/organisation.dto';
import { OrganisationService } from './organisation.service';
import {
  getAdminOrganisationSchema,
  putAdminOrganisationSchema,
  postAdminOrganisationSchema
} from "./schemas/adminCourseSchemas";

const {
  logotypeMaxSize: ALLOWED_LOGO_MAX_SIZE,
  logotypeMimetypes: ALLOWED_LOGO_MIMETYPES,
} = config.get('organisation.restrictions');

@ApiBearerAuth()
@ApiUseTags('admin organisation')
@Controller('admin/organisation')
export class AdminOrganisationController {

  constructor(
    private organisationService: OrganisationService,
    private uploadService: UploadService,
  ) { }

  @Get()
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Get organisations' })
  @ApiResponse({
    description: 'Returns all organisations',
    status: HttpStatus.OK,
  })
  @UsePipes(new JoiValidationPipe(getAdminOrganisationSchema))
  public async findAll(
    @Query() query,
    @Req() { user }
  ) {
    return this.organisationService.findAll(query, user);
  }

  @Get(':id')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'organisation',
  })
  @ApiOperation({ title: 'Get Organisation' })
  @ApiResponse({
    description: 'Returns Organisation',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Organisation is not found',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiImplicitParam({
    name: 'id',
    type: Number,
  })
  public async getFullOrganisation(
    @Param('id', new ParseIntPipe()) id,
    @Req() { user }
  ) {
    return this.organisationService.getFull(id, user);
  }

  @Get(':id/welcome')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'organisation',
  })
  @ApiOperation({ title: 'Get Organisation welcome info' })
  @ApiResponse({
    description: 'Returns Organisation welcome info.',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Organisation is not found',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiImplicitParam({
    name: 'id',
    type: Number,
  })
  public async getWelcome(
    @Param('id', new ParseIntPipe()) id,
  ) {
    return this.organisationService.getWelcome(id);
  }

  @Post()
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'organisation',
  })
  @ApiOperation({ title: 'Create organisation' })
  @ApiResponse({
    description: 'The record has been successfully created.',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Already exists an organisation registered with the same name',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', description: 'File to upload' })
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new JoiValidationPipe(postAdminOrganisationSchema))
  public async create(
    @UploadedFile() file,
    @Body(new ValidationPipe({ transform: true })) organisationData: AdminCreateOrganisationDto,
    @Req() req,
  ) {
    if (file) {
      await checkFileRestrictions(file, {
        maxSize: ALLOWED_LOGO_MAX_SIZE,
        mimetypes: ALLOWED_LOGO_MIMETYPES,
      });
    }

    const existedOrganisation = await this.organisationService.getOneByName(organisationData.name);

    if (existedOrganisation) {
      throw new BadRequestException('Sorry, already exists an organisation registered with the same name.');
    }

    await this.organisationService.checkOrganisationsCount(organisationData.lmsGroup);

    const uploadResult = file
      ? await this.uploadService.upload(file, 'logotypes/organisation')
      : null;

    const fullOrganisationData = {
      ...organisationData,
      logoImageUri: uploadResult ? uploadResult.url : null,
    };

    return this.organisationService.adminCreate(fullOrganisationData, req.user);
  }

  @Put(':id')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'organisation',
  })
  @ApiOperation({ title: 'Update organisation' })
  @ApiResponse({
    description: 'The record has been successfully updated.',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Already exists an organisation registered with the same name',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiImplicitParam({
    name: 'id',
    type: Number,
  })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', required: false, description: 'File to upload' })
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new JoiValidationPipe(putAdminOrganisationSchema))
  async update(
    @Body() organisationData: AdminUpdateOrganisationDto,
    @Param('id', new ParseIntPipe()) id,
    @UploadedFile() file,
    @Req() req,
  ) {

    return this.organisationService.updateOrganisation(file, organisationData, id, req);
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'delete',
    possession: 'any',
    resource: 'organisation',
  })
  @ApiOperation({ title: 'Delete organisation' })
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
    @Req() { user }
  ) {
    return this.organisationService.adminDelete(id, user);
  }

}

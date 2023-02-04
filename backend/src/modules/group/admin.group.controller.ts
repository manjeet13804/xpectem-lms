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
import { Response } from 'express';
import * as joi from 'joi';
import { ACGuard, UseRoles } from 'nest-access-control';
import * as path from 'path';

import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import { checkFileRestrictions } from '../../../lib/tools';
import {
  AdminCreateGroupDto,
  AdminGroupDto,
  AdminUpdateGroupDto,
  ImportGroupDto, SearchAdminGroupDto,
} from './dto/admin.group.dto';
import { GroupService } from './group.service';
import { Group } from '../../entity/Group';

const {
  templatePath: PATH_TO_IMPORT_GROUP_TEMPLATE,
  restrictions: {
    fileMimeTypes: ALLOWED_MIME_TYPES_TO_GROUP_IMPORT,
    fileMaxSize: ALLOWED_MAX_SIZE_TO_GROUP_IMPORT,
    fileHeaders: ALLOWED_HEADERS_TO_GROUP_IMPORT,
  },
} = config.get('group.import');

@ApiBearerAuth()
@ApiUseTags('admin group')
@Controller('admin/group')
export class AdminGroupController {

  constructor(
    private groupService: GroupService,
  ) { }

  @Post()
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'group',
  })
  @ApiOperation({ title: 'Create group' })
  @ApiResponse({
    description: 'The record has been successfully created.',
    status: HttpStatus.OK,
    type: AdminGroupDto,
  })
  @ApiResponse({
    description: 'Already exists an group registered with the same name',
    status: HttpStatus.BAD_REQUEST,
  })
  @UsePipes(new JoiValidationPipe({
    name: joi.string().required(),
    organisation: joi.number().min(1).integer().required(),
    translations: joi.array().items(joi.object().keys({
      language: joi.number().positive().integer().required(),
      description: joi.string().trim(),
    })).required(),
    isActive: joi.bool().required()
  }))
  public async create(
    @Body() groupData: AdminCreateGroupDto,
    @Req() req,
  ) {
    const existedGroup = await this.groupService.getOneByName(groupData.name);

    if (existedGroup) {
      throw new BadRequestException('Sorry, already exists an group registered with the same name.');
    }

    return this.groupService.adminCreate(groupData, req.user);
  }

  @Put(':id')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'group',
  })
  @ApiOperation({ title: 'Update group' })
  @ApiResponse({
    description: 'The record has been successfully updated.',
    status: HttpStatus.OK,
    type: AdminGroupDto,
  })
  @ApiResponse({
    description: 'Already exists an group registered with the same name',
    status: HttpStatus.BAD_REQUEST,
  })
  @UsePipes(new JoiValidationPipe({
    name: joi.string().required(),
    isActive: joi.boolean().required(),
    translations: joi.array().items(joi.object().keys({
      language: joi.number().min(1).integer().required(),
      description: joi.string().trim(),
    })).required(),
  }))
  public async update(
    @Param('id', new ParseIntPipe()) id,
    @Body() groupData: AdminUpdateGroupDto,
    @Req() req,
  ) {
    const existedGroup = await this.groupService.getOneByName(groupData.name);

    if (existedGroup && existedGroup.id !== id) {
      throw new BadRequestException('Sorry, already exists an group registered with the same name.');
    }

    return this.groupService.adminUpdate(id, groupData, req.user);
  }

  @Get()
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Get groups' })
  @ApiResponse({
    description: 'Returns all groups',
    status: HttpStatus.OK,
  })
  @UsePipes(new JoiValidationPipe({
    lmsGroup: joi.number().positive().integer(),
    organisation: joi.number().positive().integer(),
    name: joi.string().trim(),
    createdAt: joi.date().iso(),
    onlyActive: joi.boolean(),
  }))
  public async findAll(
    @Query() query: SearchAdminGroupDto,
    @Req() requestData,
  ): Promise<Group[]> {
    const { user: { roles } } = requestData;

    return this.groupService.findAll(query, roles, requestData.user);
  }

  @Get(':id')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'group',
  })
  @ApiOperation({ title: 'Get Group' })
  @ApiResponse({
    description: 'Returns Group',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Group is not found',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiImplicitParam({
    name: 'id',
    type: Number,
  })
  public async getFullOrganisation(
    @Param('id', new ParseIntPipe()) id,
    @Req() { user }
  ): Promise <Group> {
    return this.groupService.getFull(id, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'delete',
    possession: 'any',
    resource: 'group',
  })
  @ApiOperation({ title: 'Delete group' })
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
    return this.groupService.adminDelete(id, user);
  }

  @Post('import')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'group',
  })
  @ApiOperation({
    title: 'Import groups from file',
    description: 'Supported format: .csv',
  })
  @ApiResponse({
    description: 'Records has been successfully created.',
    status: HttpStatus.OK,
  })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', required: true, description: 'List of groups' })
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new JoiValidationPipe({
    headers: joi.array().items(joi.string().valid(ALLOWED_HEADERS_TO_GROUP_IMPORT)).length(4).required(),
    organisation: joi.number().min(1).integer().required(),
  }))
  public async  importGroup(
    @UploadedFile() file,
    @Body() body: ImportGroupDto,
    @Req() { user }
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    checkFileRestrictions(
      file,
      {
        mimetypes: ALLOWED_MIME_TYPES_TO_GROUP_IMPORT,
        maxSize: ALLOWED_MAX_SIZE_TO_GROUP_IMPORT,
      },
    );

    return this.groupService.importGroups(file, body, user);
  }

  @Get('template/download')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'group',
  })
  @ApiOperation({ title: 'Download template for import groups' })
  @ApiResponse({
    description: 'Returns template for import groups.',
    status: HttpStatus.OK,
  })
  public async downloadTemplate(
    @Res() res: Response,
  ) {
    const fullPath = path.resolve(PATH_TO_IMPORT_GROUP_TEMPLATE);
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
    res.download(fullPath, 'import_groups_template.csv', (e) => {
      if (e) {
        Logger.error(e);
        res.status(500).send(e);
      }
    });
  }

}

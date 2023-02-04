import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import * as joi from 'joi';
import { ACGuard, UseRoles } from 'nest-access-control';

import { JoiValidationPipe } from './../../common/pipes/joi-validation.pipe';
import { CreateGroupDto, UpdateGroupDto } from './dto/group.dto';
import { GroupService } from './group.service';

@ApiBearerAuth()
@ApiUseTags('group')
@Controller('group')
export class GroupController {

  constructor(private groupService: GroupService) { }

  @Get()
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'group',
  })
  @ApiOperation({ title: 'Get all groups' })
  @ApiResponse({
    description: 'Returns all records.',
    status: HttpStatus.OK,
  })
  public async getAll() {
    return this.groupService.getAll();
  }

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
  })
  @ApiResponse({
    description: 'Validation error',
    status: HttpStatus.BAD_REQUEST,
  })
  @UsePipes(new JoiValidationPipe({
    name: joi.string().required(),
    organisationId: joi.number().min(1).integer().required(),
  }))
  public async create(
    @Body() {
      name,
      organisationId,
    }: CreateGroupDto,
    @Req() requestData,
  ) {
    const { user } = requestData;

    return this.groupService.create(name, organisationId, user);
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
  })
  @UsePipes(new JoiValidationPipe({
    name: joi.string(),
    organisationId: joi.number().min(1).integer(),
  }))
  public async update(
    @Param('id') id,
    @Body() {
      name,
      organisationId,
    }: UpdateGroupDto,
    @Req() requestData,
  ) {
    const { user } = requestData;

    return this.groupService.update(id, name, organisationId, user);
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
  public async delete(
    @Param('id') id,
  ) {
    await this.groupService.delete(id);

    return HttpStatus.OK;
  }

}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import * as joi from 'joi';
import { ACGuard, UseRoles } from 'nest-access-control';

import { JoiValidationPipe } from './../../common/pipes/joi-validation.pipe';
import { CreateOrganisationDto, UpdateOrganisationDto } from './dto/organisation.dto';
import { OrganisationService } from './organisation.service';

@ApiBearerAuth()
@ApiUseTags('organisation')
@Controller('organisation')
export class OrganisationController {

  constructor(private organisationService: OrganisationService) { }

  @Get()
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'organisation',
  })
  @ApiOperation({ title: 'Get all organisations' })
  @ApiResponse({
    description: 'Returns all records.',
    status: HttpStatus.OK,
  })
  async getAll() {
    return this.organisationService.getAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'organisation',
  })
  @ApiOperation({ title: 'Get organisation' })
  @ApiResponse({
    description: 'Returns one record.',
    status: HttpStatus.OK,
  })
  async getOneOrganisation(
    @Param('id') id,
  ) {
    return this.organisationService.getOneById(id);
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
    description: 'Validation error',
    status: HttpStatus.BAD_REQUEST,
  })
  @UsePipes(new JoiValidationPipe({
    name: joi.string().required(),
    groups: joi.array().items(joi.number().min(1).integer()),
  }))
  async create(
    @Body() organisation: CreateOrganisationDto,
    @Req() requestData,
  ) {
    const { user } = requestData;

    return this.organisationService.create(organisation, user);
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
  @UsePipes(new JoiValidationPipe({
    name: joi.string(),
    groups: joi.array().items(joi.number().min(1).integer()),
  }))
  async update(
    @Param('id') id,
    @Body() organisation: UpdateOrganisationDto,
    @Req() requestData,
  ) {
    const { user } = requestData;

    return this.organisationService.update(id, organisation, user);
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
  async delete(
    @Param('id') id,
  ) {
    await this.organisationService.delete(id);

    return HttpStatus.OK;
  }
}

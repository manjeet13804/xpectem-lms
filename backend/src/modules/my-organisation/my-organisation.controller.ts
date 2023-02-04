import {
  Controller,
  Get,
  Post,
  HttpStatus,
  Req,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags, ApiImplicitParam } from '@nestjs/swagger';
import { ACGuard, UseRoles } from 'nest-access-control';

import { MyOrganisationService } from './my-organisation.service';

@ApiBearerAuth()
@ApiUseTags('my-organisation')
@Controller('my-organisation')
export class MyOrganisationController {
  constructor(private organisations: MyOrganisationService) {}

  @Get()
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'my-organisation',
  })
  @ApiOperation({ title: 'Get list of organisations that user belongs' })
  @ApiResponse({
    description: 'Returns all records.',
    status: HttpStatus.OK,
  })
  async getMyOrganisations(@Req() { user }) {
    return this.organisations.getMyOrganisations(user);
  }

  @Post(':id/select')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'my-organisation',
  })
  @ApiOperation({ title: 'Select current organisation' })
  @ApiResponse({
    description: 'Returns a new jwt token that contains an organisation id.',
    status: HttpStatus.OK,
  })
  async selectMyOrganisation(
      @Req() { user },
      @Param('id') organisationId: number,
  ) {
    return this.organisations.selectMyOrganisation(user, organisationId);
  }

  @Get(':id/welcome')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'my-organisation',
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
    @Req() { user },
  ) {
    return this.organisations.getWelcome(id, user.id);
  }
}

import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Get,
  Req,
  UseGuards,
  UsePipes,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import * as joi from 'joi';
import { ACGuard, UseRoles } from 'nest-access-control';
import { Taxonomy } from '../../entity/Taxonomy';

import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import { AddTaxonomyDto, FetchTaxonomyDto } from './admin-taxonomy.dto';
import { TaxonomyService } from './admin-taxonomy.service';

@ApiBearerAuth()
@ApiUseTags('admin taxonomies')
@Controller('admin-taxonomies')
export class AdminTaxonomyController {
  constructor(
    private taxonomyService: TaxonomyService,
  ) { }

  @Post('/taxonomies')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Create taxonomy' })
  @ApiResponse({
    description: 'The record has been successfully created.',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Validation error',
    status: HttpStatus.BAD_REQUEST,
  })
  @UsePipes(
    new JoiValidationPipe({
      metaData: joi.array().items({
        id: joi.number(),
        title: joi.string().required(),
        format: joi.string().allow(null),
        mandatory: joi.boolean().required(),
      }),
      currentLmsGroupId: joi.number().required(),
    }),
  )
  public create(@Req() { user }, @Body() taxonomyData: AddTaxonomyDto) {
    return this.taxonomyService.createTaxonomy(taxonomyData, user);
  }

  @Get('/taxonomies')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Get taxonomy' })
  @ApiResponse({
    description: 'Return taxonomy',
    status: HttpStatus.OK,
    type: [Taxonomy],
  })
  @UsePipes(
    new JoiValidationPipe({
      lmsGroupId: joi.number(),
      groupId: joi.number(),
    }),
  )
  async getTaxonomy(@Query() query: FetchTaxonomyDto, @Req() { user }) {
    return this.taxonomyService.getTaxonomy(query, user);
  }
}


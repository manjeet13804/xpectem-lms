import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';
import { FaqService } from './faq.service';
import { FaqTopic } from './faq-topic.entity';

@ApiBearerAuth()
@ApiUseTags('faq')
@Controller('faq')
export class FaqController {
  public constructor(
    private readonly faq: FaqService,
  ) {}

  @Get()
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'faq',
  })
  @ApiOperation({ title: 'Get student\'s faq list' })
  @ApiResponse({
    description: 'Returns all records.',
    status: HttpStatus.OK,
    type: [FaqTopic],
  })
  public getStudentsFaq() {
    return this.faq.getStudentsFaq();
  }

  @Get('/search')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'faq',
  })
  @ApiOperation({ title: 'Search faq' })
  @ApiResponse({
    description: 'Returns all records.',
    status: HttpStatus.OK,
    type: [FaqTopic],
  })
  public searchForCourse(
    @Query('query') query: string,
  ) {
    return this.faq.search(query);
  }
}

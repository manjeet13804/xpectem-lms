import { Controller, Get, HttpStatus, Param, ParseIntPipe, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';
import { FaqService } from '../../faq/faq.service';
import { FaqTopic } from '../../faq/faq-topic.entity';

@ApiBearerAuth()
@ApiUseTags('faq')
@Controller()
export class CourseFaqController {
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
  @ApiOperation({ title: 'Get list of faq for course' })
  @ApiResponse({
    description: 'Returns all records.',
    status: HttpStatus.OK,
    type: [FaqTopic],
  })
  public getAllForCourse(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Req() { user },
  ) {
    return this.faq.getAllForCourse(courseId, user.id);
  }

  @Get('/search')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'faq',
  })
  @ApiOperation({ title: 'Search faq for course' })
  @ApiResponse({
    description: 'Returns all records.',
    status: HttpStatus.OK,
    type: [FaqTopic],
  })
  public searchForCourse(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Req() { user },
    @Query('query') query: string,
  ) {
    return this.faq.searchForCourse(courseId, user.id, query);
  }
}

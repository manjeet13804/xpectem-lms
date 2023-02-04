import {
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
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger';
import { ACGuard, UseRoles } from 'nest-access-control';
import { AdminLessonService } from './admin.lesson.service';
import { Lesson } from '../../topic/lesson/lesson.entity';
import { JoiValidationPipe } from '../../../common/pipes/joi-validation.pipe';
import {
  SearchLessonsByNameDto,
} from '../dto/admin.course.dto';
import {
  CreateLessonDto,
  UpdateLessonDto,
  UpdateLessonOrderDto,
} from './../dto/admin.lesson.dto';
import * as joi from 'joi';

@ApiBearerAuth()
@ApiUseTags('admin lessons')
@Controller('admin')
export class AdminLessonController {
  public constructor(
    private readonly lessonService: AdminLessonService,
  ) {}

  @Get('lessons')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course-lesson',
  })
  @ApiOperation({ title: 'Get all lessons' })
  @ApiOkResponse({
    description: 'Return all lessons',
    type: [Lesson],
  })
  @UsePipes(new JoiValidationPipe({
    name: joi.string().trim(),
  }))
  public getAllLessons(
    @Query() query: SearchLessonsByNameDto,
  ): Promise<Lesson[]> {
    return this.lessonService.getAllLessons(query);
  }

  @Post('lessons')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'course-lesson',
  })
  @ApiOperation({ title: 'Add lesson' })
  @ApiCreatedResponse({
    description: 'Return created',
  })
  @UsePipes(new JoiValidationPipe({
    name: joi.string().trim().required(),
    description: joi.string().max(150).trim(),
    url: joi.string().trim(),
    topicId: joi.number().positive().integer().required(),
    exams: joi.array().items(joi.object().keys({
      name: joi.string().trim().required(),
      url: joi.string().trim(),
      maxTries: joi.number().integer().positive().required(),
      gradeA: joi.number().integer().positive().required(),
      gradeC: joi.number().integer().positive().required(),
      isManually: joi.bool().required(),
      id: joi.number().integer().positive()
    })).default([]),
    assignments: joi.array().items(joi.object().keys({
      name: joi.string().trim().required(),
      url: joi.string().trim(),
      id: joi.number().integer().positive()
    })).default([]),
    files: joi.array().items(joi.number().integer().positive()).default([])
  }))
  public createLesson(
    @Body() dataLesson: CreateLessonDto,
  ): Promise<Lesson> {
    return this.lessonService.createLesson(dataLesson);
  }

  @Put('lessons/:lessonId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'course-lesson',
  })
  @ApiOperation({ title: 'Edit lesson' })
  @ApiOkResponse({
    description: 'Return ok',
  })
  @UsePipes(new JoiValidationPipe({
    name: joi.string().trim(),
    description: joi.string().max(150).trim(),
    url: joi.string().trim(),
    exams: joi.array().items(joi.object().keys({
      name: joi.string().trim().required(),
      url: joi.string().trim(),
      maxTries: joi.number().integer().positive().required(),
      gradeA: joi.number().integer().positive().required(),
      gradeC: joi.number().integer().positive().required(),
      isManually: joi.bool().required(),
      id: joi.number().integer().positive()
    })).default([]),
    assignments: joi.array().items(joi.object().keys({
      name: joi.string().trim().required(),
      url: joi.string().trim(),
      id: joi.number().integer().positive()
    })).default([]),
    files: joi.array().items(joi.number().integer().positive())
  }))
  public editLesson(
    @Body() dataLesson: UpdateLessonDto,
    @Param('lessonId', new ParseIntPipe()) lessonId: number,
  ): Promise<Lesson> {
    return this.lessonService.editLesson(dataLesson, lessonId);
  }

  @Put('lessons/orders/:topicId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'course-lesson',
  })
  @ApiOperation({ title: 'Edit lesson' })
  @ApiOkResponse({
    description: 'Return ok',
  })
  @UsePipes(new JoiValidationPipe({
    lessonsOrdersArray: joi.array().items(joi.object().keys({
      id: joi.number().min(1).integer().required(),
      order: joi.number().min(1).integer().required(),
    })),
  }))
  public editLessonOrders(
    @Body() dataLesson: UpdateLessonOrderDto,
    @Param('topicId', new ParseIntPipe()) topicId: number,
  ): Promise<HttpStatus> {
    return this.lessonService.editLessonOrders(dataLesson, topicId);
  }

  @Delete('lessons/:lessonId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'delete',
    possession: 'any',
    resource: 'course-lesson',
  })
  @ApiOperation({ title: 'Delete lesson' })
  @ApiOkResponse({
    description: 'Return ok',
  })
  public deleteLesson(
    @Param('lessonId', new ParseIntPipe()) lessonId: number,
  ): Promise<HttpStatus> {
    return this.lessonService.deleteLesson(lessonId);
  }
}

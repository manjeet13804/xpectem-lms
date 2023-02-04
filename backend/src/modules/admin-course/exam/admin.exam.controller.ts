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
import { AdminExamService } from './admin.exam.service';
import { Exam } from '../../../entity/Exam';
import { JoiValidationPipe } from '../../../common/pipes/joi-validation.pipe';
import {
  SearchExamsByNameDto,
  CreateExamDto,
  UpdateExamDto,
  UpdateExamOrderDto,
} from './../dto/admin.exam.dto';
import * as joi from 'joi';
import { CONSTANTS } from '../../../common/enums/constants';
import { postExamValidation, putExamValidationSchema } from "./joi/admin.exam.schema";

@ApiBearerAuth()
@ApiUseTags('admin exams')
@Controller('admin')
export class AdminExamController {
  public constructor(
    private readonly examService: AdminExamService,
  ) {}

  @Get('exams')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course-exam',
  })
  @ApiOperation({ title: 'Get all exams' })
  @ApiOkResponse({
    description: 'Return all exams',
    type: [Exam],
  })
  @UsePipes(new JoiValidationPipe({
    name: joi.string().trim(),
  }))
  public getAllExams(
    @Query() query: SearchExamsByNameDto,
  ): Promise<Exam[]> {
    return this.examService.getAllExams(query);
  }

  @Post('exams')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'course-exam',
  })
  @ApiOperation({ title: 'Add exam' })
  @ApiCreatedResponse({
    description: 'Return created',
  })
  @UsePipes(new JoiValidationPipe(postExamValidation))
  public createExam(
    @Body() dataExam: CreateExamDto,
  ): Promise<Exam> {
    return this.examService.createExam(dataExam);
  }

  @Put('exams/orders/:topicId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'course-exam',
  })
  @ApiOperation({ title: 'Edit exam' })
  @ApiOkResponse({
    description: 'Return ok',
  })
  @UsePipes(new JoiValidationPipe({
    examsOrdersArray: joi.array().items(joi.object().keys({
      id: joi.number().min(1).integer().required(),
      order: joi.number().min(1).integer().required(),
    })),
  }))
  public editExamOrders(
    @Body() dataExam: UpdateExamOrderDto,
    @Param('topicId', new ParseIntPipe()) topicId: number,
  ): Promise<HttpStatus> {
    return this.examService.editExamOrders(dataExam, topicId);
  }

  @Put('exams/:examId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'course-exam',
  })
  @ApiOperation({ title: 'Edit exam' })
  @ApiOkResponse({
    description: 'Return ok',
  })
  @UsePipes(new JoiValidationPipe(putExamValidationSchema))
  public editExam(
    @Body() dataExam: UpdateExamDto,
    @Param('examId', new ParseIntPipe()) examId: number,
  ): Promise<Exam> {
    return this.examService.editExam(dataExam, examId);
  }

  @Delete('exams/:examId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'delete',
    possession: 'any',
    resource: 'course-exam',
  })
  @ApiOperation({ title: 'Delete exam' })
  @ApiOkResponse({
    description: 'Return ok',
  })
  public deleteExam(
    @Param('examId', new ParseIntPipe()) examId: number,
  ): Promise<HttpStatus> {
    return this.examService.deleteExam(examId);
  }
}

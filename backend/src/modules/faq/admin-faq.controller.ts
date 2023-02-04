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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';
import { FaqService } from './faq.service';
import { FaqTopic } from './faq-topic.entity';
import { AddTitleDto, CreateQuestionDto, QuestionAnswerDto } from './dto/question.dto';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import * as joi from 'joi';

@ApiBearerAuth()
@ApiUseTags('admin faq')
@Controller('admin-faq')
export class AdminFaqController {
  public constructor(private readonly faqService: FaqService) {}

  @Delete('/topics/:topicId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Delete lesson' })
  public async deleteTopic(@Param('topicId', new ParseIntPipe()) topicId: number) {
    return this.faqService.deleteTopic(topicId);
  }

  @Get()
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: "Get admins's faq list" })
  @ApiOkResponse({
    description: 'Returns all records.',
    type: [FaqTopic],
  })
  public getAdminsFaq(): Promise<FaqTopic[]> {
    return this.faqService.getAdminsFaq();
  }

  @Get(':courseId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'faq',
  })
  @ApiOperation({ title: "Get admins's faq list" })
  @ApiOkResponse({
    description: 'Returns all records.',
    type: [FaqTopic],
  })
  public getCoursesFaq(
    @Param('courseId', new ParseIntPipe()) courseId: number,
  ): Promise<FaqTopic[]> {
    return this.faqService.getCoursesFaq(courseId);
  }

  @Get('students/:studentId/courses/:courseId/questions')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Get faq list' })
  @ApiOkResponse({
    description: 'Returns all records.',
    type: [FaqTopic],
  })
  public async getFaqByCourse(
    @Param('courseId', new ParseIntPipe()) courseId: number,
    @Param('studentId', new ParseIntPipe()) studentId: number,
  ): Promise<FaqTopic[]> {
    return this.faqService.getAllForCourse(courseId, studentId);
  }

  @Post('/questions')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Create question' })
  @ApiOkResponse({
    description: 'Returns created.',
  })
  @UsePipes(
    new JoiValidationPipe({
      topics: joi
        .array()
        .items(
          joi
            .number()
            .positive()
            .integer(),
        )
        .min(1)
        .required(),
      courseId: joi
        .number()
        .positive()
        .integer(),
      studentId: joi
        .number()
        .positive()
        .integer(),
      question: joi.string().required(),
      answer: joi.string().required(),
      faqType: joi.string().required(),
    }),
  )
  public async createQuestion(@Body() questionAnswer: CreateQuestionDto): Promise<FaqTopic[]> {
    return this.faqService.createQuestion(questionAnswer);
  }

  @Put('/questions/:questionId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Edit question' })
  @ApiOkResponse({
    description: 'Returns ok.',
  })
  @UsePipes(
    new JoiValidationPipe({
      question: joi.string().required(),
      answer: joi.string().required(),
    }),
  )
  public async editQuestion(
    @Param('questionId', new ParseIntPipe()) questionId: number,
    @Body() questionAnswer: QuestionAnswerDto,
  ): Promise<HttpStatus> {
    return this.faqService.editQuestion(questionAnswer, questionId);
  }

  @Post('/topics')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Create lesson' })
  @ApiCreatedResponse({
    description: 'Returns created.',
    type: FaqTopic,
  })
  @UsePipes(
    new JoiValidationPipe({
      title: joi.string().required(),
      faqType: joi.string().required(),
      courseId: joi
        .number()
        .integer()
        .positive(),
    }),
  )
  public async addNewTopic(@Body() { title, faqType, courseId }: AddTitleDto): Promise<FaqTopic> {
    return this.faqService.addNewTopic(title, faqType, courseId);
  }

  @Delete('/questions/:questionId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'delete',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Delete question' })
  @ApiOkResponse({
    description: 'Returns ok.',
  })
  public async deleteQuestion(
    @Param('questionId', new ParseIntPipe()) questionId: number,
  ): Promise<HttpStatus> {
    return this.faqService.deleteQuestion(questionId);
  }

  @Get('/topics/search')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Get faq list' })
  @ApiOkResponse({
    description: 'Returns all records.',
    type: [FaqTopic],
  })
  public async searchTopicsByCourseStudent(@Query() { title }: AddTitleDto): Promise<FaqTopic[]> {
    return this.faqService.searchTopicsByCourseStudent(title);
  }
}

import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import {
  Controller,
  HttpStatus,
  UseGuards,
  Put,
  Body,
  UsePipes,
  Post,
  Delete,
  Param,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { User } from '../../../entity/User';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';
import { ExamService } from './exam.service';
import { ExamEditPointsDto, ExamLogsEditPointsDto, ExamLogForAddDto } from './dto/exam.dto';
import { JoiValidationPipe } from '../../../common/pipes/joi-validation.pipe';
import { StudentExamLog } from './student-exam-log.entity';
import {
  postExamLogsSchema,
  putAdminExamsSchema,
  putExamLogsSchema,
} from './schemas/adminExamSchemas';

@ApiBearerAuth()
@ApiUseTags('admin exam')
@Controller('admin-exam')
export class AdminExamController {
  constructor(public readonly examService: ExamService) {}

  @Put('exams')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Edit points to exam' })
  @ApiOkResponse({
    description: 'Returns ok.',
  })
  @UsePipes(new JoiValidationPipe(putAdminExamsSchema))
  async editExamPoints(@Body() { exams }: ExamEditPointsDto): Promise<HttpStatus> {
    return this.examService.editExamPoints(exams);
  }

  @Put('exam-logs')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Edit points to examLog' })
  @ApiOkResponse({
    description: 'Returns ok.',
  })
  @UsePipes(new JoiValidationPipe(putExamLogsSchema))
  async editExamLogPoints(@Body() { studentLogs }: ExamLogsEditPointsDto): Promise<HttpStatus> {
    return this.examService.editExamLogPoints(studentLogs);
  }

  @Post('exam-logs')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'add examLog' })
  @ApiOkResponse({
    description: 'Returns ok.',
  })
  @UsePipes(new JoiValidationPipe(postExamLogsSchema))
  async addExamLog(
    @Req() { user }: { user: User },
    @Body() examLog: ExamLogForAddDto,
  ): Promise<StudentExamLog> {
    return this.examService.addExamLog(examLog, user);
  }

  @Delete('exam-logs/:id')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'delete',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'delete exam log' })
  @ApiOkResponse({
    description: 'Returns ok.',
  })
  async deleteExamLog(@Param('id', new ParseIntPipe()) id: number): Promise<HttpStatus> {
    return this.examService.deleteExamLog(id);
  }
}

import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import {
  Controller,
  HttpStatus,
  UseGuards,
  Put,
  UsePipes,
  Body,
  Post,
  Req,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';
import { JoiValidationPipe } from '../../../common/pipes/joi-validation.pipe';
import { User } from '../../../entity/User';
import { AssignmentLogsForAddDto, AssignmentsEditDto } from './dto/assignmentLogsDto';
import {
  editAssignmentLogSchema,
  postAssignmentLogSchema,
} from './schemas/admin-assignment.schema';
import { AssignmentService } from './assignment.service';
import { StudentAssignmentLog } from './student-assignment-log.entity';

@ApiBearerAuth()
@ApiUseTags('admin assignment')
@Controller('admin-assignment')
export class AdminAssignmentController {
  constructor(public readonly assignments: AssignmentService) {}

  @Put('assignment-logs')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Edit status to assignment log' })
  @ApiOkResponse({
    description: 'Return ok.',
  })
  @UsePipes(new JoiValidationPipe(editAssignmentLogSchema))
  async editStatusAssignmentLogs(@Body() { studentLogs }: AssignmentsEditDto): Promise<HttpStatus> {
    return this.assignments.editStatusAssignmentLogs(studentLogs);
  }

  @Post('assignment-logs')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'add assignment log' })
  @ApiOkResponse({
    description: 'Return ok.',
  })
  @UsePipes(new JoiValidationPipe(postAssignmentLogSchema))
  async addAssignmentLog(
    @Req() { user }: { user: User },
    @Body() assignmetLogs: AssignmentLogsForAddDto,
  ): Promise<StudentAssignmentLog> {
    return this.assignments.addAssignmentLog(assignmetLogs, user);
  }

  @Delete('assignment-logs/:id')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'delete',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'delete assignment log' })
  @ApiOkResponse({
    description: 'Returns ok.',
  })
  async deleteAssignmentLog(@Param('id', new ParseIntPipe()) id: number): Promise<HttpStatus> {
    return this.assignments.deleteAssignmentLog(id);
  }
}

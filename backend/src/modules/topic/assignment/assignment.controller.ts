import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  HttpStatus,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';
import { AssignmentService } from './assignment.service';
import { AssignmentView } from './assignment.view';

@ApiBearerAuth()
@ApiUseTags('assignment')
@Controller('assignment')
export class AssignmentController {
  constructor(
    public readonly assignments: AssignmentService,
  ) {}

  @Get(':id')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'own',
    resource: 'assignment',
  })
  @ApiOperation({ title: 'Get assignment' })
  @ApiResponse({
    description: 'Returns an one assignment.',
    status: HttpStatus.OK,
    type: AssignmentView,
  })
  getAssignment(
    @Param('id') id: number,
    @Req() { user },
  ) {
    return this.assignments.getAssignmentFor(user, id);
  }

  @Post(':id/start')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'own',
    resource: 'assignment-log',
  })
  @ApiOperation({ title: 'Start assignment' })
  @ApiResponse({
    description: 'Returns an one assignment.',
    status: HttpStatus.OK,
    type: AssignmentView,
  })
  startAssignment(
    @Param('id') id: number,
    @Req() { user },
  ) {
    return this.assignments.startAssignmentBy(user, id);
  }

  @Post(':id/complete')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'own',
    resource: 'assignment-log',
  })
  @ApiOperation({ title: 'Complete assignment' })
  @ApiResponse({
    description: 'Returns an one assignment.',
    status: HttpStatus.OK,
    type: AssignmentView,
  })
  completeAssignment(
    @Param('id') id: number,
    @Req() { user },
  ) {
    return this.assignments.completeAssignmentBy(user, id);
  }
}

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
import { AdminAssignmentService } from './admin.assignment.service';
import { Assignment } from './../../topic/assignment/assignment.entity';
import { JoiValidationPipe } from '../../../common/pipes/joi-validation.pipe';
import {
  SearchAssignmentByNameDto,
  CreateAssignmentDto,
  UpdateAssignmentDto,
  UpdateAssignmentOrderDto,
} from './../dto/admin.assignment.dto';
import * as joi from 'joi';
import { postAssignmentValidation, putExamValidationSchema } from "./schemas/admin.assignment.schema";

@ApiBearerAuth()
@ApiUseTags('admin exams')
@Controller('admin')
export class AdminAssignmentController {
  public constructor(
    private readonly assignmentService: AdminAssignmentService,
  ) {}

  @Get('assignments')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'course-assignment',
  })
  @ApiOperation({ title: 'Get all assignments' })
  @ApiOkResponse({
    description: 'Return all assignments',
    type: [Assignment],
  })
  @UsePipes(new JoiValidationPipe({
    name: joi.string().trim(),
  }))
  public getAllAssignments(
    @Query() query: SearchAssignmentByNameDto,
  ): Promise<Assignment[]> {
    return this.assignmentService.getAllAssignments(query);
  }

  @Post('assignments')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'course-assignment',
  })
  @ApiOperation({ title: 'Add assignment' })
  @ApiCreatedResponse({
    description: 'Return created',
  })
  @UsePipes(new JoiValidationPipe(postAssignmentValidation))
  public createAssignment(
    @Body() dataAssignment: CreateAssignmentDto,
  ): Promise<Assignment> {
    return this.assignmentService.createAssignment(dataAssignment);
  }

  @Put('assignments/orders/:topicId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'course-assignment',
  })
  @ApiOperation({ title: 'Edit assignments' })
  @ApiOkResponse({
    description: 'Return ok',
  })
  @UsePipes(new JoiValidationPipe({
    assignmentsOrdersArray: joi.array().items(joi.object().keys({
      id: joi.number().min(1).integer().required(),
      order: joi.number().min(1).integer().required(),
    })),
  }))
  public editAssignmentOrders(
    @Body() dataAssignment: UpdateAssignmentOrderDto,
    @Param('topicId', new ParseIntPipe()) topicId: number,
  ): Promise<HttpStatus> {
    return this.assignmentService.editAssignmentOrders(dataAssignment, topicId);
  }

  @Put('assignments/:assignmentId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'course-assignment',
  })
  @ApiOperation({ title: 'Edit assignment' })
  @ApiOkResponse({
    description: 'Return ok',
  })
  @UsePipes(new JoiValidationPipe(putExamValidationSchema))
  public editAssignment(
    @Body() dataAssignment: UpdateAssignmentDto,
    @Param('assignmentId', new ParseIntPipe()) assignmentId: number,
  ): Promise<Assignment> {
    return this.assignmentService.editAssignment(dataAssignment, assignmentId);
  }

  @Delete('assignments/:assignmentId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'delete',
    possession: 'any',
    resource: 'course-assignment',
  })
  @ApiOperation({ title: 'Delete assignment' })
  @ApiOkResponse({
    description: 'Return ok',
  })
  public deleteAssignment(
    @Param('assignmentId', new ParseIntPipe()) assignmentId: number,
  ): Promise<HttpStatus> {
    return this.assignmentService.deleteAssignment(assignmentId);
  }
}

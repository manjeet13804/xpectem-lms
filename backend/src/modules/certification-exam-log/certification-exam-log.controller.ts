import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UsePipes,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import * as baseJoi from 'joi';
import * as extension from 'joi-date-extensions';
import { ACGuard, UseRoles } from 'nest-access-control';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import { CertificationExamLogService } from './certification-exam-log.service';
import { ICertificationExamLog, ICertificationExamLogs, ICreateCertificationExamLog, IGetCertificationExamLog } from './certification-exam-log.dto';
import { DATE_FORMATS } from '../../common/enums/dateFormats';

const joi = baseJoi.extend(extension);

@ApiBearerAuth()
@ApiUseTags('Certification exam logs')
@Controller('certification-exam-logs')
export class CertificationExamLogController {
  constructor(
    private certificationExamLogService: CertificationExamLogService,
  ) { }

  @Post()
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'certification-exam-logs',
  })
  @ApiOperation({ title: 'Create certification exam log' })
  @ApiResponse({
    description: 'The record has been successfully created.',
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    description: 'Validation error',
    status: HttpStatus.BAD_REQUEST,
  })
  @UsePipes(
    new JoiValidationPipe({
      date: joi.date().format(DATE_FORMATS.simpleDate).required(),
      isPassed: joi.boolean().required(),
      results: joi.string(),
      sendNotifications: joi.boolean().required(),
      studentId: joi.number().integer().positive().required(),
      courseId: joi.number().integer().positive().required(),
    }),
  )
  public create(@Req() { user }, @Body() body: ICreateCertificationExamLog): Promise<ICertificationExamLogs> {
    return this.certificationExamLogService.create(body, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'certification-exam-logs',
  })
  @ApiOperation({ title: 'Delete certification exam log' })
  @ApiResponse({
    description: 'The record has been successfully deleted.',
    status: HttpStatus.OK,
  })
  public delete(
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return this.certificationExamLogService.deleteLog(id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'certification-exam-logs',
  })
  @ApiOperation({ title: 'Get certification exam logs' })
  @ApiResponse({
    description: 'The list of certification exam logs',
    type: ICertificationExamLogs,
    status: HttpStatus.OK,
  })
  public getListOfLogs(
    @Query() query: IGetCertificationExamLog,
  ) {
    return this.certificationExamLogService.getListOfLogs(query);
  }
}


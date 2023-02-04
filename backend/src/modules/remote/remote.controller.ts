import { Body, Controller, HttpStatus, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import * as config from 'config';
import * as joi from 'joi';
import { ACGuard, UseRoles } from 'nest-access-control';

import { JoiValidationPipe } from './../../common/pipes/joi-validation.pipe';
import { DataCreateLearnLogsDto } from './dto/data-create-learn-logs.dto';
import { PassedFormLearnResultDto } from './dto/passed-form-learn-result.dto';
import { RemoteService } from './remote.service';

const TOKEN_LENGTH: number = config.get('jwt.tokenLength');

@ApiBearerAuth()
@ApiUseTags('remote')
@Controller('remote')
export class RemoteController {
  constructor(private readonly learnService: RemoteService) {}

  @Post('save-result-course')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'check_user_access',
  })
  @ApiOperation({ title: 'Save course progression' })
  @ApiResponse({
    description: 'Data successfully saved',
    status: HttpStatus.OK,
  })
  @UsePipes(
    new JoiValidationPipe({
      token: joi
        .string()
        .required()
        .length(TOKEN_LENGTH),
      result: joi.string().required(),
    }),
  )
  public async saveResultCourse(@Body() { token, result }: PassedFormLearnResultDto) {
    return this.learnService.saveCourseProgression(token, result);
  }

  @Post('save-result-exam')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'check_user_access',
  })
  @ApiOperation({ title: 'Save exam results' })
  @ApiResponse({
    description: 'Data successfully saved',
    status: HttpStatus.OK,
  })
  @UsePipes(
    new JoiValidationPipe({
      token: joi
        .string()
        .required()
        .length(TOKEN_LENGTH),
      result: joi.string().required(),
    }),
  )
  public async saveResultExam(@Body() { token, result }: PassedFormLearnResultDto) {
    return this.learnService.saveExamResults(token, result);
  }

  @Post('save-result-assignment')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'check_user_access',
  })
  @ApiOperation({ title: 'Save assignment results' })
  @ApiResponse({
    description: 'Data successfully saved',
    status: HttpStatus.OK,
  })
  @UsePipes(
    new JoiValidationPipe({
      token: joi
        .string()
        .required()
        .length(TOKEN_LENGTH),
      result: joi.string().required(),
    }),
  )
  public async saveResultAssignment(@Body() { token, result }: PassedFormLearnResultDto) {
    return this.learnService.saveAssignmentResults(token, result);
  }

  @Post('create-url')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'user',
  })
  @ApiOperation({ title: 'Create url' })
  @ApiResponse({
    description: 'Returns url',
    status: HttpStatus.OK,
  })
  @UsePipes(
    new JoiValidationPipe({
      formLearnId: joi.number().required(),
      type: joi
        .string()
        .required()
        .valid(['exam', 'course', 'assignment']),
    }),
  )
  public async saveDataPassCourse(
    @Body() { formLearnId, type }: DataCreateLearnLogsDto,
    @Req() { user },
  ) {
    return this.learnService.createLinkWithTokenForLearn({ formLearnId, type, user });
  }
}

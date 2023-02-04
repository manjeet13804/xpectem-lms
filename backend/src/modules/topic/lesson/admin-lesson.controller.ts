import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { Body, Controller, HttpStatus, Put, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';
import { JoiValidationPipe } from '../../../common/pipes/joi-validation.pipe';
import * as joi from 'joi';
import { LessonService } from './lesson.service';

@ApiBearerAuth()
@ApiUseTags('admin lesson')
@Controller('admin-lesson')
export class AdminLessonController {
  constructor(
    public readonly lessonService: LessonService,
  ) {}
}

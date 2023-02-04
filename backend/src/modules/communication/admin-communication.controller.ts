import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  SerializeOptions,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  Delete
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';
import { CommunicationMessage } from './communication-message.entity';
import { CommunicationService } from './communication.service';
import { IRequest } from '../../common/interfaces/globalInterfaces';
import { CommunicationDialog } from './communication-dialog.entity';
import { CommunicationDataDto, CreateDialogAndSendMessageDto, EditHeaderDto, ReassignHeaderDto, SearchByAllMessageDto } from './communication.dto';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as config from 'config';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import * as joi from 'joi';
import { User } from '../../entity/User';

const ATTACHMENT_MAX_COUNT: number = config.get('communication.attachmentMaxCount');

@ApiBearerAuth()
@ApiUseTags('admin communications')
@Controller('admin-communications')
export class AdminCommunicationController {
  public constructor(
    private readonly communicationService: CommunicationService,
  ) {}

  @Post('students/:studentId/courses/:courseId/dialogs')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'admin-student',
  })
  @SerializeOptions({ groups: ['admin-student'] })
  @UseInterceptors(FilesInterceptor('attachment'))
  @ApiOperation({ title: 'Add new question by course' })
  @ApiCreatedResponse({
    description: 'Returns created.',
  })
  @UsePipes(new JoiValidationPipe({
    heading: joi.string().trim().required(),
    message: joi.string().trim(),
  }))
  public async addDialogForStudentCourse(
    @Param('courseId', new ParseIntPipe()) courseId: number,
    @Param('studentId', new ParseIntPipe()) studentId: number,
    @Body() sendMessage: CreateDialogAndSendMessageDto,
    @Req() { user },
    @UploadedFiles() attachments,
  ): Promise<CommunicationDialog> {
    const communicationData: CommunicationDataDto = {
      courseId,
      studentId,
      user,
    };

    return this.communicationService.addDialogForStudentCourse(sendMessage, attachments, communicationData);
  }

  @Post('students/:studentId/courses/:courseId/dialogs/:dialogId/messages')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'admin-student',
  })
  @SerializeOptions({ groups: ['admin-student'] })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'attachment', maxCount: ATTACHMENT_MAX_COUNT }]))
  @ApiOperation({ title: 'Add new message by question' })
  @ApiOkResponse({
    description: 'Returns ok.',
  })
  @UsePipes(new JoiValidationPipe({
    message: joi.string().trim(),
    closeDialog: joi.bool().optional().default(false),
  }))
  public async sendMessageStudentCourse(
    @Param('courseId', new ParseIntPipe()) courseId: number,
    @Param('dialogId', new ParseIntPipe()) dialogId: number,
    @Body() sendMessage: CreateDialogAndSendMessageDto,
    @Req() { user },
    @UploadedFiles() attachment,

  ): Promise<CommunicationMessage> {
    const dialog = await this.communicationService.getCurrentDialog(courseId, dialogId);

    return this.communicationService.sendMessage({
      sendMessage,
      dialog,
      attachment,
      user,
    });
  }

  @Put('students/:studentId/courses/:courseId/dialogs/:dialogId')
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
  @UsePipes(new JoiValidationPipe({
    heading: joi.string().trim().required(),
  }))
  public async editHeading(
    @Param('dialogId', new ParseIntPipe()) dialogId: number,
    @Param('courseId', new ParseIntPipe()) courseId: number,
    @Param('studentId', new ParseIntPipe()) studentId: number,
    @Body() editHeaderDto: EditHeaderDto,
    @Req() { user },
  ): Promise<HttpStatus> {
    const communicationData: CommunicationDataDto = {
      studentId,
      courseId,
      dialogId,
      user,
    };

    return this.communicationService.editHeading(editHeaderDto, communicationData);
  }

  @Put('students/courses/dialogs/:dialogId/reassign')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Reassign dialog on other tutor' })
  @ApiOkResponse({
    description: 'Returns accepted.',
  })
  @UsePipes(new JoiValidationPipe({
    courseId: joi.number().required().positive().integer(),
    studentId: joi.number().required().positive().integer(),
    tutorId: joi.number().required().positive().integer(),
  }))
  public async reassignDialog(
    @Param('dialogId', new ParseIntPipe()) dialogId: number,
    @Body() reassignHeaderDto: ReassignHeaderDto,
    @Req() { user },
  ): Promise<HttpStatus> {
    return this.communicationService.reassignHeader(reassignHeaderDto, dialogId, user);
  }

  @Get('students/:studentId/courses/:courseId/dialogs/search')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Get communication list by student course' })
  @SerializeOptions({ groups: ['admin-student'] })
  @ApiOkResponse({
    description: 'Returns all found records.',
    type: [CommunicationDialog],
  })
  @UsePipes(new JoiValidationPipe({
    search: joi.string().trim(),
  }))
  public searchHeadingStudentCourse(
    @Param('courseId', new ParseIntPipe()) courseId: number,
    @Param('studentId', new ParseIntPipe()) studentId: number,
    @Query() { search }: SearchByAllMessageDto,
    @Req() { user },
  ): Promise<CommunicationDialog[]> {
    return this.communicationService.searchHeadingStudentCourse(courseId, studentId, user, search);
  }

  @Get()
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Get communications for admin' })
  @SerializeOptions({ groups: ['admin-student'] })
  @ApiOkResponse({
    description: 'Returns all found records.',
    type: [CommunicationMessage],
  })
  @UsePipes(new JoiValidationPipe({
    search: joi.string().trim().allow('').default(''),
  }))
  public searchAdminMessages(
    @Query() { search }: SearchByAllMessageDto,
    @Req() { user }: Request & { user: User } ,
  ): Promise<CommunicationDialog[]> {
    return this.communicationService.searchAdminMessages(user, search);
  }

  @Get('admins/search')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Get tutor/admins list' })
  @ApiOkResponse({
    description: 'Returns all records.',
    type: [User],
  })
  @UsePipes(new JoiValidationPipe({
    search: joi.string().trim(),
  }))
  public searchTutors(
    @Query() { search }: SearchByAllMessageDto,
  ): Promise<User[]> {
    return this.communicationService.searchTutors(search);
  }

  @Post('dialogs/:dialogId/mark-complete')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Mark dialog as completed' })
  @ApiOkResponse({
    description: 'Returns ok.',
  })
  public async markDialogCompleted(
    @Param('dialogId', new ParseIntPipe()) dialogId: number,
  ): Promise<HttpStatus.OK> {

    return this.communicationService.markDialogCompleted(dialogId);
  }

  @Post('/dialogs/read/:dialogId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Mark dialog as completed' })
  @ApiOkResponse({
    description: 'Returns ok.',
  })
  public async readMessagesAdmin(
      @Param('dialogId', new ParseIntPipe()) dialogId: number,
  ): Promise<HttpStatus.OK> {

    return this.communicationService.readMessagesAdmin(dialogId);
  }

  @Put('students/:studentId/courses/:courseId/dialogs/:dialogId/abort-dialog')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Abort dialog from admin' })
  @ApiOkResponse({
    description: 'Returns ok.',
  })
  public async abortDialogFromAdmin(
    @Param('courseId', new ParseIntPipe()) courseId: number,
    @Param('dialogId', new ParseIntPipe()) dialogId: number,
    @Req() { user }: IRequest,
  ): Promise<HttpStatus.OK> {
    const dialog = await this.communicationService.getCurrentDialog(courseId, dialogId);

    return this.communicationService.abortDialogFromAdmin(dialog, user.id);
  }

  @Delete('dialogs/:dialogId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'delete',
    possession: 'any',
    resource: 'admin-student',
  })
  public async deleteDialog(
    @Param('dialogId', new ParseIntPipe()) dialogId: number,
    @Req() { user }: IRequest,
  ): Promise<HttpStatus> {
    return this.communicationService.deleteDialog(dialogId, user);
  }

  @Delete('dialogs/:dialogId/messages/:messageId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'delete',
    possession: 'any',
    resource: 'admin-student',
  })
  public async deleteMessage(
    @Param('dialogId', new ParseIntPipe()) dialogId: number,
    @Param('messageId', new ParseIntPipe()) messageId: number,
    @Req() { user }: IRequest,
  ): Promise<HttpStatus> {
    return this.communicationService.deleteLastMessage(dialogId, messageId, user);
  }
}

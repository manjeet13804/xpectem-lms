import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  SerializeOptions,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiImplicitFile, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import * as config from 'config';
import * as joi from 'joi';
import { ACGuard, UseRoles } from 'nest-access-control';

import { JoiValidationPipe } from './../../../common/pipes/joi-validation.pipe';
import { CommunicationMessage } from './../../communication/communication-message.entity';
import {
  CreateDialogAndSendMessageDto,
  SearchByAllMessageDto,
  SendMessageDto,
} from './../../communication/communication.dto';
import { CommunicationService } from './../../communication/communication.service';
import { IUser } from '../../user/interfaces/user.interface';
import { IRequest } from '../../../common/interfaces/globalInterfaces';

const ATTACHMENT_MAX_COUNT: number = config.get('communication.attachmentMaxCount');

@ApiBearerAuth()
@ApiUseTags('communication')
@Controller()
export class CourseCommunicationController {
  public constructor(
    private readonly communication: CommunicationService,
  ) { }

  @Get()
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'communication',
  })
  @ApiOperation({ title: 'Return all user communication' })
  @ApiResponse({
    description: 'Return all user communication',
    status: HttpStatus.OK,
  })
  public async getAllUserCommunication(
    @Req() { user },
  ) {
    return this.communication.getAllUserCommunication(user);
  }

  @Get(':courseId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'communication/:courseId',
  })
  @ApiOperation({ title: 'Return all user dialogs for the course' })
  @ApiResponse({
    description: 'Return all user dialogs for the course',
    status: HttpStatus.OK,
  })
  public async getAllUserDialogs(
    @Req() { user },
    @Param('courseId') courseId: number,
  ) {
    return this.communication.getAllUserDialogs(user.id, courseId);
  }

  @Get(':courseId/:dialogId')
  @SerializeOptions({ groups: ['dialog'] })
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'communication/:courseId/:dialogId',
  })
  @ApiOperation({ title: 'Return all messages from the dialog' })
  @ApiResponse({
    description: 'Return all messages from the dialog',
    status: HttpStatus.OK,
  })
  public async getAllUserDialogMessage(
    @Param('courseId') courseId: number,
    @Param('dialogId') dialogId: number,
  ): Promise<CommunicationMessage[]> {
    return this.communication.getAllUserDialogMessage(courseId, dialogId);
  }

  @Post(':courseId')
  @SerializeOptions({ groups: ['dialog'] })
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'communication/:courseId',
  })
  @ApiOperation({ title: 'Create new dialog and send message' })
  @ApiResponse({
    description: 'Create new dialog and send message',
    status: HttpStatus.OK,
  })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'attachment', required: false, description: 'Files to upload' })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'attachment', maxCount: ATTACHMENT_MAX_COUNT }]))
  @UsePipes(new JoiValidationPipe({
    heading: joi.string().required(),
    message: joi.string().required(),
  }))
  public async createDialogAndsendMessage(
    @Param('courseId') courseId: number,
    @Req() { user },
    @Body() sendMessage: CreateDialogAndSendMessageDto,
    @UploadedFiles() attachment,
  ) {
    return this.communication.createDialog(courseId, sendMessage.heading, user.id, sendMessage.message, attachment);
  }

  @Post(':courseId/:dialogId')
  @SerializeOptions({ groups: ['dialog'] })
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'communication/:courseId/:dialogId',
  })
  @ApiOperation({ title: 'Send new message' })
  @ApiResponse({
    description: 'Send new message',
    status: HttpStatus.OK,
  })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'attachment', required: false, description: 'Files to upload' })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'attachment', maxCount: 5 }]))
  @UsePipes(new JoiValidationPipe({
    message: joi.string().required(),
  }))
  public async sendMessage(
    @Param('courseId') courseId: number,
    @Param('dialogId') dialogId: number,
    @Req() { user },
    @Body() sendMessage: SendMessageDto,
    @UploadedFiles() attachment,
  ) {
    const dialog = await this.communication.getCurrentDialog(courseId, dialogId);
    
    return this.communication.sendMessage({
      sendMessage,
      dialog,
      attachment,
      user,
    });
  }

  @Delete('dialogs/:dialogId/messages/:messageId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'delete',
    possession: 'any',
    resource: 'communication/:courseId/:dialogId',
  })
  public async deleteMessage(
    @Param('dialogId', new ParseIntPipe()) dialogId: number,
    @Param('messageId', new ParseIntPipe()) messageId: number,
    @Req() { user }: IRequest,
  ) {
    return this.communication.deleteLastMessage(dialogId, messageId, user);
  }

  @Put(':courseId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'communication/:courseId',
  })
  @ApiOperation({ title: 'Search by all messages' })
  @ApiResponse({
    description: 'Search by all messages',
    status: HttpStatus.OK,
  })
  @UsePipes(new JoiValidationPipe({
    search: joi.string().allow('').required(),
  }))
  public async searchByAllMessages(
    @Param('courseId') courseId: number,
    @Body() searchData: SearchByAllMessageDto,
    @Req() { user }: IRequest,
  ) {
    return this.communication.searchByAllMesage(searchData.search, courseId, user);
  }

  @Put('/read-messages/:dialogId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: '/read-messages/:dialogId',
  })
  @ApiOperation({ title: 'Set dialog messages read' })
  @ApiResponse({
    description: 'Set dialog messages read',
    status: HttpStatus.OK,
  })
  public async setDialogMessagesRead(
    @Param('dialogId') dialogId: number,
    @Req() { user },
  ): Promise<HttpStatus.OK> {
    return this.communication.setMessageReadedInDialog(dialogId, user);
  }
}

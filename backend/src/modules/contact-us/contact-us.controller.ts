import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiImplicitFile, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import * as config from 'config';
import * as joi from 'joi';
import { ACGuard, UseRoles } from 'nest-access-control';

import { JoiValidationPipe } from './../../common/pipes/joi-validation.pipe';
import { ContactUsSendMessageDto } from './contact-us.dto';
import { ContactUsService } from './contact-us.service';

const ATTACHMENT_MAX_COUNT: number = config.get('communication.attachmentMaxCount');

@ApiBearerAuth()
@ApiUseTags('contact-us')
@Controller()
export class ContactUsController {
  public constructor(
    private readonly contactUsService: ContactUsService,
  ) { }

  @Post('contact-us')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'contact-us',
  })
  @ApiOperation({ title: 'Sending a message to technical support' })
  @ApiResponse({
    description: 'Sending a message to technical support successful',
    status: HttpStatus.OK,
  })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'attachment', required: false, description: 'Files to upload' })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'attachment', maxCount: ATTACHMENT_MAX_COUNT }]))
  @UsePipes(new JoiValidationPipe({
    courseId: joi.string().required(),
    message: joi.string().required(),
  }))
  public async createDialogAndsendMessage(
    @Req() { user },
    @Body() sendMessageData: ContactUsSendMessageDto,
    @UploadedFiles() attachment,
  ): Promise<HttpStatus> {

    return this.contactUsService.sendMessage({
      attachment,
      sendMessageData,
      userId: user.id,
    });
  }

}

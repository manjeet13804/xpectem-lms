import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
  SerializeOptions,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiImplicitFile, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import * as config from 'config';
import { Response } from 'express';
import * as joi from 'joi';
import { ACGuard, UseRoles } from 'nest-access-control';

import { UploadService } from '../upload/upload.service';
import { JoiValidationPipe } from './../../common/pipes/joi-validation.pipe';
import { UpdateUserBackgroundDto, UserProfileUpdateDto } from './dto/user.dto';
import { UserProfileService } from './user-profile.service';
import { UserService } from './user.service';

const ALLOWED_AVATAR_MIMETYPES: string[] = config.get('user.account.avatarMimetype');
const ALLOWED_AVATAR_MAX_SIZE: number = config.get('user.account.avatarMaxSize');

@ApiBearerAuth()
@ApiUseTags('user')
@Controller('user')
export class UserController {

  constructor(
    private userService: UserService,
    private userProfileService: UserProfileService,
    private uploadService: UploadService,
  ) { }

  @Get()
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'own',
    resource: 'user',
  })
  @ApiOperation({ title: 'Get personal info' })
  @ApiResponse({
    description: 'Returns current user info.',
    status: HttpStatus.OK,
  })
  public async getUser(@Req() requestData) {
    const { user } = requestData;

    return this.userService.getOneById(user.id);
  }

  @Get('profile')
  @SerializeOptions({ groups: ['profile'] })
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'own',
    resource: 'profile',
  })
  @ApiOperation({ title: 'Get personal profile info' })
  @ApiResponse({
    description: 'Returns current user profile info.',
    status: HttpStatus.OK,
  })
  public async getProfile(@Req() requestData) {
    const { user } = requestData;

    return this.userProfileService.getUserProfile(user.id);
  }

  @Put('profile')
  @SerializeOptions({ groups: ['profile'] })
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'own',
    resource: 'profile',
  })
  @ApiOperation({ title: 'Update personal profile info' })
  @ApiResponse({
    description: 'Returns updated current user profile info.',
    status: HttpStatus.OK,
  })
  @UsePipes(new JoiValidationPipe({
    firstName: joi.string(),
    lastName: joi.string(),
    email: joi.array().items(joi.string().email()).min(1),
    phone: joi.array().items(joi.string()),
    personNumber: joi.string(),
    language: joi.number().positive().integer(),
    notifyEmail: joi.boolean().strict(),
    notifySms: joi.boolean().strict(),
  }))
  public async updateUserProfile(
    @Req() requestData,
    @Body() userProfileDto: UserProfileUpdateDto,
  ) {
    const { user } = requestData;

    return this.userProfileService.updateProfile(user.id, userProfileDto);
  }

  @Put('profile/avatar')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'own',
    resource: 'profile/avatar',
  })
  @ApiOperation({ title: 'Update personal avatar' })
  @ApiResponse({
    description: 'Update personal avatar',
    status: HttpStatus.OK,
  })
  @UsePipes(new JoiValidationPipe({
    uri: joi.string().uri().required(),
  }))
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', required: true, description: 'File to upload' })
  @UseInterceptors(FileInterceptor('file'))
  public async updateUserAvatar(
    @Req() requestData,
    @UploadedFile() file,
  ) {
    const { user } = requestData;
    const {
      mimetype,
      size,
    } = file;

    if (size > ALLOWED_AVATAR_MAX_SIZE) {
      throw new HttpException({ error: 'Maximum file size exceeded' }, HttpStatus.BAD_REQUEST);
    } else if (!ALLOWED_AVATAR_MIMETYPES.includes(mimetype)) {
      throw new HttpException({ error: 'invalid file format' }, HttpStatus.BAD_REQUEST);
    }
    const uploadResult = await this.uploadService.upload(file);

    return this.userProfileService.updateUserAvatar(user.id, uploadResult.url);
  }

  @Put('profile/background')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'own',
    resource: 'profile/background',
  })
  @ApiOperation({ title: 'Update personal profile background' })
  @ApiResponse({
    description: 'Update personal profile background',
    status: HttpStatus.OK,
  })
  @UsePipes(new JoiValidationPipe({
    uri: joi.string().uri().required(),
  }))
  public async updateUserBackground(
    @Req() requestData,
    @Body() userBackgroundDto: UpdateUserBackgroundDto,
  ) {
    const { user } = requestData;

    return this.userProfileService.updateUserBackground(user.id, userBackgroundDto.uri);
  }

  @Post('reset-password')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'own',
    resource: 'reset-password',
  })
  @ApiOperation({ title: 'Reset user password' })
  @ApiResponse({
    description: 'Reset user password',
    status: HttpStatus.OK,
  })
  public async resetPassword(@Req() requestData) {
    const { user } = requestData;

    return this.userProfileService.resetUserPassword(user.id);
  }

  @Post('profile/export')
  @SerializeOptions({ groups: ['profile'] })
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'own',
    resource: 'profile/export',
  })
  @ApiOperation({ title: 'Export personal profile info' })
  @ApiResponse({
    description: 'Returns zip-file with data about current user profile info.',
    status: HttpStatus.OK,
  })
  public async exportUserProfile(
    @Req() requestData,
    @Res() response: Response,
  ) {
    const { user } = requestData;

    const exportData = await this.userProfileService.exportProfile(user.id);
    exportData.pipe(response);
    exportData.end();
  }

  @Put('profile/close')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'own',
    resource: 'profile/close',
  })
  @ApiOperation({ title: 'Close user account' })
  @ApiResponse({
    description: 'Close user account',
    status: HttpStatus.OK,
  })
  public async closeUserAccount(@Req() requestData) {
    const { user } = requestData;

    return this.userProfileService.closeUserAccount(user.id);
  }

}

import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
  UsePipes,
  UploadedFiles,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiImplicitFile,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import * as config from 'config';
import * as joi from 'joi';
import { ACGuard, UseRoles } from 'nest-access-control';

import { User } from '../../../entity/User';
import { TutorFolder } from '../../../entity/TutorFolder';
import { JoiValidationPipe } from '../../../common/pipes/joi-validation.pipe';
import { Tools } from '../../../common/tools/tools';
import { AdminTutorFilesService } from './admin.tutor-files.service';
import { CreateFolderRequestDto, CreateFolderResponseDto } from './dto/create-folder.dto';
import { GetFoldersAndFilesDto } from './dto/get-folder.dto';
import { GetFileDto } from './dto/get-file.dto';
import { UpdateFileRequestDto, UpdateFileResponseDto } from './dto/update-file.dto';
import { CreateFileDto } from './dto/create-file.dto'

const MAX_FILES_COUNT: number = config.get('tutor.files.maxCount');
const MAX_FILE_SIZE: number = config.get('tutor.files.maxSize');
const ALLOWED_FILE_MIME_TYPES: string[] = config.get('tutor.files.mimeTypes');
const ROOT_FOLDER_NAME = 'root';

@ApiBearerAuth()
@ApiUseTags('admin tutor files')
@Controller('admin/tutor')
export class AdminTutorFilesController {
  constructor(
    private tutorService: AdminTutorFilesService,
    private tools: Tools,
  ) {}

  @Get('folders')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'tutor-files',
  })
  @ApiOperation({ title: 'Get folders and files' })
  @ApiResponse({
    description: 'Returning folders with files',
    status: HttpStatus.OK,
    type: GetFoldersAndFilesDto,
    isArray: true,
  })
  public async getFoldersAndFiles(
    @Req() { user }: Request & { user: User },
  ) {
    const { folders, files } = await this.tutorService.getFoldersAndFiles(user);

    if (folders.some(({ name }: TutorFolder) => name === ROOT_FOLDER_NAME)) {
      return { files, folders };
    }

    const rootFolder = await this.tutorService.findOrCreateFolder(user, ROOT_FOLDER_NAME);

    // add empty files array for api consistency
    rootFolder.files = [];

    return { files, folders: [rootFolder, ...folders] };
  }

  @Post('folders')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'tutor-files',
  })
  @ApiOperation({ title: 'Create folder for tutor files' })
  @ApiResponse({
    description: 'The folder has been successfully created.',
    status: HttpStatus.CREATED,
    type: CreateFolderResponseDto,
  })
  @UsePipes(new JoiValidationPipe({
    folderName: joi.string().required(),
  }))
  public async create(
    @Body() { folderName }: CreateFolderRequestDto,
    @Req() { user }: Request & { user: User },
  ) {
    return this.tutorService.findOrCreateFolder(user, folderName);
  }

  @Delete('folders/:folderId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'delete',
    possession: 'any',
    resource: 'tutor-files',
  })
  @ApiOperation({ title: 'Remove folder and files' })
  @ApiResponse({
    description: 'The folder has been successfully removed.',
    status: HttpStatus.OK,
    type: CreateFolderResponseDto,
  })
  public async removeFolder(
    @Param('folderId', new ParseIntPipe()) folderId: number,
    @Req() { user }: Request & { user: User },
  ) {
    return this.tutorService.removeFolder(user, folderId);
  }

  @Post('folders/files')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'tutor-files',
  })
  @ApiOperation({ title: 'Upload files to folder' })
  @ApiResponse({
    description: 'The files has been successfully uploaded.',
    status: HttpStatus.CREATED,
    type: GetFileDto,
    isArray: true,
  })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'files[]', required: true, description: 'Files to upload' })
  @UseInterceptors(FilesInterceptor('files', MAX_FILES_COUNT))
  @UsePipes(new JoiValidationPipe({
    folderId: joi.number().integer().positive(),
  }))
  public async upload(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() { folderId }: CreateFileDto,
    @Req() { user }: Request & { user: User },
  ) {
    for (const file of files) {
      this.tools.checkFileValid(file, ALLOWED_FILE_MIME_TYPES, MAX_FILE_SIZE);
    }

    return this.tutorService.uploadFiles(user, folderId, files);
  }

  @Put('folders/files/:fileId')
  @SerializeOptions({ groups: ['update'] })
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'tutor-files',
  })
  @ApiOperation({ title: 'Update uploaded file' })
  @ApiResponse({
    description: 'The file has been successfully updated.',
    status: HttpStatus.OK,
    type: UpdateFileResponseDto,
  })
  @UsePipes(new JoiValidationPipe(joi.object({
    folderName: joi.string().allow(''),
    fileName: joi.string(),
    folderId: joi.number().positive().integer(),
  }).or('folderName', 'fileName')))
  public async updateFile(
    @Param('fileId', new ParseIntPipe()) fileId: number,
    @Body() { folderName, fileName, folderId }: UpdateFileRequestDto,
    @Req() { user }: Request & { user: User },
  ) {
    return this.tutorService.updateFile(user, {
      folderId,
      fileId,
      folderName,
      fileName,
    });
  }

  @Delete('folders/files/:fileId')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'delete',
    possession: 'any',
    resource: 'tutor-files',
  })
  @ApiOperation({ title: 'Remove uploaded file' })
  @ApiResponse({
    description: 'The file has been successfully removed.',
    status: HttpStatus.OK,
  })
  public async removeFile(
    @Param('fileId', new ParseIntPipe()) fileId: number,
    @Req() { user }: Request & { user: User },
  ) {
    return this.tutorService.removeFile(user, { fileId });
  }
}

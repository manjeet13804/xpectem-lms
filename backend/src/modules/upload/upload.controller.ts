import {
  Controller,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiImplicitFile,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import {
  FileInterceptor,
} from '@nestjs/platform-express';
import { ACGuard, UseRoles } from 'nest-access-control';

import { UploadService } from './upload.service';

@ApiBearerAuth()
@ApiUseTags('file management')
@Controller('file')
export class UploadController {

  constructor(private uploadService: UploadService) { }

  @Post('upload')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'file',
  })
  @ApiOperation({ title: 'Upload file' })
  @ApiResponse({
    description: 'The file has been successfully uploaded.',
    status: HttpStatus.OK,
  })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', required: true, description: 'File to upload' })
  @UseInterceptors(FileInterceptor('file'))
  public uploadFile(@UploadedFile() file) {
    return this.uploadService.upload(file);
  }

}

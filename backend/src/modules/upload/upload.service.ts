import { HttpException, BadRequestException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as config from 'config';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { upload, updateContentDisposition, remove } from '../../../lib/aws/s3';
import { IIsFileValid, UploadResult } from './interfaces/upload.interface';

const {
  bucketFolder,
  mediaBucket,
} = config.get('aws.s3');

@Injectable()
export class UploadService {
  public async upload(
    {
      buffer,
      mimetype,
      originalname,
    },
    pathToUpload?: string,
    attachmentName?: string,
  ): Promise<UploadResult> {
    const fileExtension = path.extname(originalname);
    const key = `${pathToUpload || bucketFolder}/${uuidv4()}${fileExtension}`;
    try {
      const { url } = await upload(mediaBucket, mimetype, key, buffer, attachmentName);

      return {
        url,
        originalName: originalname,
        mimeType: mimetype,
      };
    } catch (err) {
      Logger.error(err.message, err.stack);

      throw new BadRequestException(`Failed to upload image file: ${originalname}`);
    }
  }

  public isFileValid({ file, maxSize, availableMimetype }: IIsFileValid) {
    const isValidSize = file.every(item => item.size < maxSize);

    if (!isValidSize) {
      throw new HttpException({ error: 'Maximum file size exceeded' }, HttpStatus.BAD_REQUEST);
    }

    const isValidMimetype = file.every(item => {
      return availableMimetype.includes(item.mimetype)
    });

    if (!isValidMimetype) {
      throw new HttpException({ error: 'Invalid file format' }, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateAttachmentName(pathToUpload: string, oldFileName: string, mimeType: string, newFileName: string) {
    return updateContentDisposition(mediaBucket, mimeType, `${pathToUpload}/${oldFileName}`, newFileName);
  }

  public async remove(path: string) {
    return remove(mediaBucket, path);
  }
}

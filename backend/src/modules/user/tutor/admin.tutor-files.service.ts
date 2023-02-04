import {
  BadRequestException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { last } from 'ramda';
import { Connection } from 'typeorm';

import { User } from '../../../entity/User';
import { TutorFolder } from '../../../entity/TutorFolder';
import { UploadService } from '../../upload/upload.service';
import { TutorFile } from '../../../entity/TutorFile';

const S3_TUTOR_FILES_PATH = 'tutor_files';

interface UpdateFileData {
  fileId: number;
  folderId?: number;
  folderName?: string;
  fileName?: string;
}

@Injectable()
export class AdminTutorFilesService {
  private entityManager = this.connection.createEntityManager();

  constructor(
    private readonly connection: Connection,
    private readonly uploadService: UploadService,
  ) {}

  public async getFoldersAndFiles(tutor: User) {
    const folders = await this.entityManager.find(TutorFolder, {
      where: {
        tutor: {
          id: tutor.id,
        },
      },
      relations: ['tutor', 'files'],
      order: {
        name: 'ASC',
      },
    });

    const files = await this.entityManager.find(TutorFile, {
      where: {
        tutor: {
          id: tutor.id,
        },
        folder: null
      }
    })

    return { folders, files }
  }

  public async uploadFiles(tutor: User, folderId: number, files: Express.Multer.File[]) {
    const promises = files.map((file: Express.Multer.File) =>
      this.uploadService.upload(file, S3_TUTOR_FILES_PATH, file.originalname),
    );
    const uploadResults = await Promise.all(promises);
    const folderEntity = folderId ? await this.getFolder(tutor, folderId) : null;

    const filesEntities = uploadResults.map(({ url, originalName, mimeType }) => new TutorFile({
      url,
      mimeType,
      tutor,
      name: originalName,
      folder: folderEntity,
    }));

    return this.connection.transaction(
      async transaction => transaction.save(filesEntities),
    );
  }

  public async findOrCreateFolder(tutor: User, folderName: string) {
    const folder = await this.connection
      .getRepository(TutorFolder)
      .createQueryBuilder('tutor_folder')
      .leftJoinAndSelect('tutor_folder.tutor', 'tutor')
      .where('tutor.id = :id', { id: tutor.id })
      .andWhere('LOWER(name) = :folderName', { folderName })
      .getOne();

    if (folder) {
      return folder;
    }

    return this.entityManager.save(new TutorFolder({ tutor, name: folderName }));
  }

  public async updateFile(tutor: User, {
    folderId,
    fileId,
    folderName,
    fileName,
  }: UpdateFileData) {
    const folderEntity = folderId ? await this.getFolder(tutor, folderId) : null;
    const fileEntity = await this.getFile(fileId);

    if (fileName && fileEntity.name !== fileName) {
      const oldFileName = last(fileEntity.url.split('/'));
      await this.uploadService.updateAttachmentName(
        S3_TUTOR_FILES_PATH,
        oldFileName,
        fileEntity.mimeType,
        fileName,
      );
      fileEntity.name = fileName;
    }

    const isNeedToUpdateFolder = Boolean(folderName);
    if (isNeedToUpdateFolder) {
      fileEntity.folder = await this.findOrCreateFolder(tutor, folderName);
    }

    return this.entityManager.save(fileEntity);
  }

  public async removeFolder(tutor: User, folderId: number) {
    const folderEntity = await this.getFolder(tutor, folderId);

    await this.entityManager.remove(folderEntity);

    return HttpStatus.OK;
  }

  public async removeFile(tutor: User, {
    fileId,
  }: {
    fileId: number,
  }) {
    const fileEntity = await this.getFile(fileId);

    await this.entityManager.remove(fileEntity);

    return HttpStatus.OK;
  }

  private async getFolder(tutor: User, folderId: number): Promise<TutorFolder> {
    const folderEntity = await this.entityManager.findOne(
      TutorFolder,
      folderId,
      { relations: ['tutor'] },
    );

    if (!folderEntity || folderEntity.tutor.id !== tutor.id) {
      throw new BadRequestException('folder not found');
    }

    return folderEntity;
  }

  private async getFile(fileId: number): Promise<TutorFile> {
    const fileEntity = await this.entityManager.findOne(TutorFile, {
      where: {
        id: fileId,
      },
    });

    if (!fileEntity) {
      throw new BadRequestException('file not found');
    }

    return fileEntity;
  }
}

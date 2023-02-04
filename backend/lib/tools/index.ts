import { BadRequestException } from '@nestjs/common';

interface Restrictions {
  maxSize: number;
  mimetypes: string[];
}

export const checkFileRestrictions = (
  file,
  {
    maxSize,
    mimetypes,
  }: Restrictions,
) => {
  if (file) {
    const {
      mimetype,
      size,
    } = file;

    if (size > maxSize) {
      throw new BadRequestException('Maximum file size exceeded');
    } else if (!mimetypes.includes(mimetype)) {
      throw new BadRequestException('Invalid file format');
    }
  }
};

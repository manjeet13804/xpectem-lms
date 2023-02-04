import { ApiModelProperty } from '@nestjs/swagger';

import { CourseStatus } from '../../course/course-status.enum';
import { CreateCourseTranslationDto } from './createCourseTranslationDto.dto'

export class SearchCourseDto {
  @ApiModelProperty({ required: false })
  public readonly title: string;  
  
  @ApiModelProperty({ required: false })
  public readonly idLmsGroup?: number;

  @ApiModelProperty()
  public readonly groupId: number;

  @ApiModelProperty({ isArray: true, type: 'number' })
  public readonly groupIds: number[];

  @ApiModelProperty({ required: false })
  public readonly isEdit?: boolean;

  @ApiModelProperty({ required: false })
  public readonly isOnlyPublished?: boolean;

  @ApiModelProperty({ required: false })
  public readonly isOnlyOrderable?: boolean;

  @ApiModelProperty({ isArray: true, type: 'number' })
  public readonly organisationIds: number[];
}

export class SearchCourseGroupDto {
  @ApiModelProperty({ required: false })
  public readonly studentId: number;

  @ApiModelProperty({ isArray: true, type: 'number' })
  public readonly groupId: number[];
}

export class CourseTimeDto {
  @ApiModelProperty()
  public readonly courseStudentId: number;

  @ApiModelProperty({ required: false })
  public readonly startAt: Date;

  @ApiModelProperty({ required: false })
  public readonly wishedDoneDate: Date;
}

export class SearchCourseByTitleDto {
  @ApiModelProperty({ required: false })
  public readonly title: string;
}

export class SearchLessonsByNameDto {
  @ApiModelProperty({ required: false })
  public readonly name: string;
}

export class CreateCourseDto {
  @ApiModelProperty()
  public readonly senderEmail: string;

  @ApiModelProperty()
  public readonly isCertified: boolean;

  @ApiModelProperty()
  public readonly isOrderable: boolean;

  @ApiModelProperty()
  public readonly senderName: string;

  @ApiModelProperty()
  public readonly price: number;

  @ApiModelProperty()
  public readonly isStepByStepTopics: boolean;

  @ApiModelProperty()
  public readonly title: string;

  @ApiModelProperty()
  public readonly language: number;

  @ApiModelProperty()
  public readonly certificate: number;

  @ApiModelProperty()
  public readonly accessTime: number;

  @ApiModelProperty()
  public readonly timeToComplete: number;

  @ApiModelProperty({
    type: CreateCourseTranslationDto,
    isArray: true,
  })
  translations: CreateCourseTranslationDto[];

  @ApiModelProperty({
    isArray: true,
    type: 'number',
  })
  public readonly tutorIds: number[];

  @ApiModelProperty({
    isArray: true,
    type: 'number',
  })
  public readonly categoriesIds: number[];

  @ApiModelProperty({
    isArray: true,
    type: 'number',
  })
  public readonly fileIds: number[];

  @ApiModelProperty()
  public readonly hasPhysical: boolean;
}

export class UpdateCourseDto {
  @ApiModelProperty()
  public readonly isCertified: boolean;

  @ApiModelProperty()
  public readonly isOrderable: boolean;

  @ApiModelProperty()
  public readonly senderEmail: string;

  @ApiModelProperty()
  public readonly senderName: string;

  @ApiModelProperty()
  public readonly price: number;

  @ApiModelProperty()
  public readonly isStepByStepTopics: boolean;

  @ApiModelProperty()
  public readonly id: number;

  @ApiModelProperty({
    required: false,
  })
  public readonly title: string;

  @ApiModelProperty({
    required: false,
  })
  public readonly language: number;

  @ApiModelProperty({
    required: false,
  })
  public readonly certificate: number;

  @ApiModelProperty({
    required: false,
  })
  public readonly accessTime: number;

  @ApiModelProperty({
    required: false,
  })
  public readonly timeToComplete: number;

  @ApiModelProperty({
    type: CreateCourseTranslationDto,
    isArray: true,
  })
  translations: CreateCourseTranslationDto[];

  @ApiModelProperty({
    isArray: true,
    type: 'number',
  })
  topics: number[]

  @ApiModelProperty({
    isArray: true,
    type: 'number',
  })
  public readonly tutorIds: number[];

  @ApiModelProperty({
    isArray: true,
    type: 'number',
  })
  public readonly categoriesIds: number[];

  @ApiModelProperty({
    isArray: true,
    type: 'number',
  })
  public readonly fileIds: number[];

  @ApiModelProperty()
  public readonly hasPhysical: boolean;

  @ApiModelProperty()
  public readonly welcomeEmailTemplateURL: string;

  @ApiModelProperty()
  public readonly welcomeLetterTemplateURL: string;

  @ApiModelProperty()
  public readonly imageUri: string;
}

export class UpdateTopicInfoDto {
  @ApiModelProperty()
  public readonly topicName: string;

  @ApiModelProperty()
  public readonly topicDescription: string;
}

export class UpdateCourseTopicsDto {
  @ApiModelProperty()
  public readonly topics: (number | string)[];
}

export class UpdateCourseTutorsDto {
  @ApiModelProperty({
    isArray: true,
    type: 'number',
  })
  public readonly tutorIds: number[];
}

export class UpdateCourseFilesDto {
  @ApiModelProperty({
    isArray: true,
    type: 'number',
  })
  public readonly fileIds: number[];
}

export class FileTemplateDto {
  @ApiModelProperty()
  public readonly fieldname: string;

  @ApiModelProperty()
  public readonly originalname: string;

  @ApiModelProperty()
  public readonly encoding: string;

  @ApiModelProperty()
  public readonly mimetype: string;

  @ApiModelProperty()
  public readonly buffer: Buffer;

  @ApiModelProperty()
  public readonly size: number;
}

export class FileTopicsSearchDto {
  @ApiModelProperty()
  public readonly header: string;

  @ApiModelProperty()
  public readonly createdAt: string;
}

export class CourseTopicsSearchDto {
  @ApiModelProperty()
  public readonly name: string;
}

export class FilesSearchDto {
  @ApiModelProperty()
  public readonly name: string;

  @ApiModelProperty()
  public readonly header: string;

  @ApiModelProperty()
  public readonly createdAt: string;
}

export class UploadFileDto {
  @ApiModelProperty()
  public readonly name: string;

  @ApiModelProperty()
  public readonly header: string;

  @ApiModelProperty()
  public readonly id: number;

  @ApiModelProperty()
  public readonly topicId: number;
}

export class AllUploadFilesDto {
  @ApiModelProperty()
  public readonly certificateTemplate: string;

  @ApiModelProperty()
  public readonly welcomeEmailTemplate: string;

  @ApiModelProperty()
  public readonly welcomeLetterTemplate: string;
}

export class UploadResultsDto {
  @ApiModelProperty()
  public readonly results: AllUploadFilesDto[];
}

export class ChangeCourseStatusDto {
  @ApiModelProperty()
  public readonly courseId: number;

  @ApiModelProperty()
  public readonly status: CourseStatus;
}

export class CreateTopicDto {
  @ApiModelProperty()
  public readonly courseId: number;

  @ApiModelProperty()
  public readonly name: string;

  @ApiModelProperty()
  public readonly id: number;
}

export class Category {
  @ApiModelProperty()
  public readonly name: string;

  @ApiModelProperty()
  public readonly id: number;
}

export class CategoriesDto {
  @ApiModelProperty({ isArray: true, type: Category })
  public readonly categories: Category[]
}

export class IPermissionItem {
  @ApiModelProperty()
  public readonly id: number;

  @ApiModelProperty()
  public readonly permissionId: number;
}

export class ICoursePermission {
  @ApiModelProperty()
  public readonly id: number;

  @ApiModelProperty({ isArray: true, type: IPermissionItem })
  public readonly permissionItems: IPermissionItem[];
}

export class IPermissionDto {
  @ApiModelProperty()
  public readonly permissionLevel: string;

  @ApiModelProperty({ isArray: true, type: ICoursePermission })
  public readonly courses: ICoursePermission[];

  @ApiModelProperty()
  public readonly isRewrite: boolean;
}

export class PermissionDto {
  @ApiModelProperty()
  public readonly permissionLevel: string;

  @ApiModelProperty({ isArray: true, type: 'number' })
  public readonly courseIds: number[];

  @ApiModelProperty({ isArray: true, type: 'number' })
  public readonly ids: number[];
}

export class IPermission {
  @ApiModelProperty()
  public readonly  id: number;

  @ApiModelProperty({ isArray: true })
  public readonly  permissionItems: IsPermissions[];
}

export class IsPermissions {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  permissionId: number | null;
}

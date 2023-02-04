import { ApiModelProperty } from '@nestjs/swagger';
import * as moment from 'moment';
import * as config from 'config';
import { Taxonomy } from '../../../../entity/Taxonomy';

const MAX_STUDENTS_COUNT: number = config.get('group.maxStudentsCountGroup');

class CourseInfo {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  dateBegin: Date;
}

export class StudentDto {
  @ApiModelProperty()
  public readonly firstName: string;

  @ApiModelProperty()
  public readonly lastName: string;

  @ApiModelProperty()
  public readonly streetAddress: string;

  @ApiModelProperty({
    isArray: true,
    type: 'string',
  })
  public readonly emails: string[];

  @ApiModelProperty({
    isArray: true,
    type: 'string',
  })
  public readonly phones: string[];

  @ApiModelProperty()
  public readonly language: number;

  @ApiModelProperty()
  public readonly notifyEmail: boolean;

  @ApiModelProperty()
  public readonly notifySms: boolean;

  @ApiModelProperty({
    isArray: true,
    type: 'AddStudentTaxonomyDto',
  })
  public readonly studentTaxonomy: AddStudentTaxonomyDto[];
}

export class AddStudentTaxonomyDto {
  @ApiModelProperty()
  taxonomy: Taxonomy;

  @ApiModelProperty()
  value: string;
}

export class UpdateStudentDto {
  @ApiModelProperty({
    example: 'student street address',
    description: 'address',
  })
  public readonly streetAddress: string;

  @ApiModelProperty({
    example: 'student firstName',
    description: 'Jone',
  })
  public readonly firstName: string;

  @ApiModelProperty({
    example: 'student lastName',
    description: 'Jone',
  })
  public readonly lastName: string;

  @ApiModelProperty({
    isArray: true,
    type: 'string',
    example: 'student emails',
    description: 'Jone@email.com',
  })
  public readonly emails: string[];

  @ApiModelProperty({
    isArray: true,
    type: 'string',
    example: 'student emails',
    description: '+0000000000',
  })
  public readonly phones: string[];

  @ApiModelProperty({
    example: 'student language',
  })
  public readonly language: number;

  @ApiModelProperty()
  public readonly notifyEmail: boolean;

  @ApiModelProperty()
  public readonly notifySms: boolean;

  @ApiModelProperty()
  public readonly personNumber: string;

  @ApiModelProperty({ required: false })
  public readonly employeeNumber: string;

  @ApiModelProperty()
  public readonly avatar: string;

  @ApiModelProperty()
  public readonly lmsGroupId: number;

  @ApiModelProperty({
    isArray: true,
    required: false,
    type: AddStudentTaxonomyDto,
  })
  studentTaxonomy: [AddStudentTaxonomyDto];
}

export class AddCoursesForStudents {
  @ApiModelProperty({
    example: 'course id',
    description: '0',
  })
  courseId: number;

  @ApiModelProperty({
    type: 'string',
    format: 'date',
    example: 'date begin',
    default: moment().toDate(),
  })
  dateBegin: Date;
}

export class AddStudentsDto {
  @ApiModelProperty({
    isArray: true,
    maxLength: MAX_STUDENTS_COUNT,
    type: StudentDto,
  })
  students: [StudentDto];

  @ApiModelProperty({
    isArray: true,
    required: false,
    type: AddStudentTaxonomyDto,
  })
  taxonomies: [AddStudentTaxonomyDto];

  @ApiModelProperty({
    isArray: true,
    type: AddCoursesForStudents,
  })
  courses: [AddCoursesForStudents];

  @ApiModelProperty()
  groups: number[];

  @ApiModelProperty()
  currentLmsGroupId: number;
}

export class UpdateCoursesForStudents {
  @ApiModelProperty()
  courseId: number;

  @ApiModelProperty({
    type: 'string',
    format: 'date',
  })
  dateEnd: Date;

  @ApiModelProperty({
    type: 'string',
    format: 'date',
  })
  dateBegin: Date;

  @ApiModelProperty()
  coursePassed: boolean;
}

export class UpdateStudentsDto {
  @ApiModelProperty()
  student: UpdateStudentDto;

  @ApiModelProperty({
    isArray: true,
    type: UpdateCoursesForStudents,
  })
  courses: [UpdateCoursesForStudents];

  @ApiModelProperty({
    isArray: true,
    type: AddCoursesForStudents,
  })
  newCourses: [AddCoursesForStudents];
}

export class SearchStudentsDto {
  @ApiModelProperty({ required: false })
  firstName: string;

  @ApiModelProperty({ required: false })
  lastName: string;

  @ApiModelProperty({ required: false })
  email: string;

  @ApiModelProperty({ required: false })
  phone: string;

  @ApiModelProperty({ required: false })
  personNumber: string;

  @ApiModelProperty({ required: false })
  employeeNumber: string;

  @ApiModelProperty({ required: false })
  isDeactivated: boolean;
}

export class ImportStudentDto {
  @ApiModelProperty({ isArray: true, type: 'string' })
  public readonly headers: string[];

  @ApiModelProperty({ isArray: true, type: 'number' })
  public readonly groups: number[];

  @ApiModelProperty({ isArray: true, type: CourseInfo})
  public readonly courses: CourseInfo[];
}

export class AddNoteDto {
  @ApiModelProperty()
  note: string;
}

export class GetExampleFileDto {
  @ApiModelProperty()
  public readonly groupId: number;
}

export class StudentToUpdate {
  @ApiModelProperty({
    example: 'email',
    description: 'user@email.com'
  })
  public readonly email: string

  @ApiModelProperty({
    isArray: true,
    type: AddCoursesForStudents,
  })
  public readonly courses: AddCoursesForStudents[];
}

export class AddStudentDto {
  @ApiModelProperty({
    isArray: true,
    type: StudentToUpdate
  })
  public readonly studentsToUpdate: StudentToUpdate[];
}

export class CoursesInfoForEmailDto {
  @ApiModelProperty()
  public startDate: string;

  @ApiModelProperty()
  public createdDate: string;

  @ApiModelProperty()
  public creatorAffilation: string;

  @ApiModelProperty()
  public creatorName: string;

  @ApiModelProperty()
  public creatorEmails: string[];

  @ApiModelProperty()
  public courseName: string;
}

import { Exclude, Expose, Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { AssignmentType } from './assignment-type.enum';
import { User } from '../../../entity/User';
import { StudentAssignmentLog } from './student-assignment-log.entity';
import { Assignment } from './assignment.entity';

@Expose()
export class AssignmentView {
  @ApiModelProperty()
  public readonly id: number;

  @ApiModelProperty()
  public readonly name: string;

  @ApiModelProperty()
  public readonly description: string;

  @ApiModelProperty()
  private readonly url: string|null;

  @ApiModelProperty()
  public readonly maxTries: number;

  @ApiModelProperty()
  public readonly type: AssignmentType;

  @Type(() => StudentAssignmentLog)
  @ApiModelProperty()
  public readonly log?: StudentAssignmentLog|null;

  @Exclude()
  public readonly assignment: Assignment;

  @Exclude()
  public readonly forUser?: User|null;

  constructor(
    assignment: Assignment,
    forUser?: User|null,
  ) {
    this.id = assignment.id;
    this.name = assignment.name;
    this.description = assignment.description;
    this.url = assignment.url;
    this.maxTries = assignment.maxTries;
    this.type = assignment.type;
    this.log = assignment.getLastStudentLogFor(forUser) || null;
    this.assignment = assignment;
    this.forUser = forUser;
  }

  @Expose()
  @ApiModelProperty()
  get link() {
    const isNotPassed = !this.log || this.log.isNotPassed;

    return this.type === AssignmentType.WebForm
      && this.assignment.isUserHasTry(this.forUser)
      && isNotPassed
      && this.url
      || null;
  }

  @Expose()
  @ApiModelProperty()
  get todayTries() {
    return this.assignment.getTodayTriesFor(this.forUser);
  }

  @Expose()
  @ApiModelProperty()
  get totalTries() {
    return this.assignment.getTotalTriesFor(this.forUser);
  }
}

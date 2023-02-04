import * as joi from 'joi';
import { StudentAssignmentLogStatusEnum } from '../student-assignment-log-status.enum';

export const postAssignmentLogSchema = {
  status: joi
    .string()
    .valid([StudentAssignmentLogStatusEnum.Completed, StudentAssignmentLogStatusEnum.Failed])
    .required(),
  studentId: joi
    .number()
    .positive()
    .integer()
    .required(),
  assignmentId: joi
    .number()
    .positive()
    .integer()
    .required(),
  points: joi
    .number()
    .positive()
    .integer(),
  startedAt: joi.string(),
  completedAt: joi.string(),
  asnwers: joi.string(),
};

export const editAssignmentLogSchema = {
  studentLogs: joi
    .array()
    .items(
      joi.object().keys({
        id: joi
          .number()
          .positive()
          .integer()
          .required(),
        status: joi
          .string()
          .valid([StudentAssignmentLogStatusEnum.Completed, StudentAssignmentLogStatusEnum.Failed])
          .required(),
        completedAt: joi.string(),
      }),
    )
    .required(),
};

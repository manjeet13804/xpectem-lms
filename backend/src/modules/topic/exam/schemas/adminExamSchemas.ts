import * as joi from 'joi';

export const putAdminExamsSchema = {
  exams: joi
    .array()
    .items(
      joi.object().keys({
        id: joi
          .number()
          .positive()
          .integer()
          .required(),
        gradeA: joi
          .number()
          .integer()
          .positive(),
        gradeB: joi
          .number()
          .integer()
          .positive(),
        gradeC: joi
          .number()
          .integer()
          .positive(),
        maxPoints: joi
          .number()
          .integer()
          .positive(),
      }),
    )
    .required(),
};

export const putExamLogsSchema = {
  studentLogs: joi
    .array()
    .items(
      joi.object().keys({
        id: joi
          .number()
          .positive()
          .integer()
          .required(),
        points: joi
          .number()
          .positive()
          .integer()
          .required(),
        completedAt: joi.string(),
      }),
    )
    .required(),
};

export const postExamLogsSchema = {
  points: joi
    .number()
    .min(0)
    .integer()
    .required(),
  studentId: joi
    .number()
    .positive()
    .integer()
    .required(),
  examId: joi
    .number()
    .positive()
    .integer()
    .required(),
  startedAt: joi.string(),
  completedAt: joi.string(),
  asnwers: joi.string(),
};

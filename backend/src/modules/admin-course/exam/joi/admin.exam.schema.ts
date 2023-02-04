import * as joi from "joi";
import { CONSTANTS } from "../../../../common/enums/constants";

export const postExamValidation = {
  name: joi.string().trim().required(),
  url: joi.string().trim(),
  maxTries: joi.number().integer().positive().allow([0, null]),
  maxPoints: joi.number().integer().positive().max(CONSTANTS.EXAM_MAX_POINTS).allow(null).required(),
  gradeA: joi.number().integer().positive().allow([0, null]),
  gradeC: joi.number().integer().positive().required(),
  topicId: joi.number().positive().integer().required(),
  isManually: joi.bool().required()
}

export const putExamValidationSchema = {
  name: joi.string().trim().required(),
  url: joi.string().trim(),
  maxTries: joi.number().integer().positive().allow([0, null]),
  maxPoints: joi.number().integer().positive().max(CONSTANTS.EXAM_MAX_POINTS).allow(null).required(),
  gradeA: joi.number().integer().positive().allow([0, null]),
  gradeC: joi.number().integer().positive().required(),
  isManually: joi.bool().required()
}

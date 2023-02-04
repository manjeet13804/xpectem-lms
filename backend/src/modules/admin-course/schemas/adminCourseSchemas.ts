import * as joi from "joi";
import {CourseStatus} from "../../course/course-status.enum";

export const getCourseValidation = {
  title: joi.string().allow(null).allow(''), 
  idLmsGroup: joi.string(),
  groupIds: joi.array().items(joi.number().allow(null)),
  groupId: joi
    .number()
    .positive()
    .integer(),
  isEdit: joi.boolean().optional().default(false),
  isPublished: joi.boolean().optional().default(false),
  isOnlyOrderable: joi.boolean().optional().default(false),
  isOnlyPublished: joi.boolean().optional().default(false),
  organisationIds: joi.array().items(joi.number()),
}

export const postCourseValidation = {
  price: joi.number().positive(),
  senderEmail: joi.string().trim().email(),
  senderName: joi.string().trim(),
  isCertified: joi.bool().required(),
  isOrderable: joi.bool().required(),
  isStepByStepTopics: joi
    .bool()
    .default(false),
  title: joi
    .string()
    .trim()
    .required(),
  language: joi
    .number()
    .required()
    .positive()
    .integer(),
  certificate: joi
    .number()
    .positive()
    .integer(),
  accessTime: joi
    .number()
    .integer()
    .positive(),
  timeToComplete: joi
    .number()
    .integer()
    .positive(),
  tutorIds: joi.array().items(
    joi
      .number()
      .positive()
      .integer(),
  ).default([]),
  categoriesIds: joi.array().items(
    joi
      .number()
      .positive()
      .integer(),
  ).default([]),
  translations: joi.array().items(joi.object().keys({
    language: joi.number().min(1).integer().required(),
    description: joi.string().trim(),
    welcomeLetter: joi.string().trim(),
    welcomeEmail: joi.string().trim(),
    descriptionShort: joi.string().trim().allow(''),
    systemRequirements: joi.string().trim(),
  })).max(3).default([]),
  fileIds: joi.array().items(
    joi
      .number()
      .positive()
      .integer(),
  ),
  hasPhysical: joi.bool().default(false),
}

export const putCourseValidation = {
  senderEmail: joi.string().trim().email(),
  senderName: joi.string().trim(),
  price: joi.number().positive(),
  isCertified: joi.bool().required(),
  isOrderable: joi.bool().required(),
  imageFile: joi.string().allow(null),
  id: joi
    .number()
    .positive()
    .integer()
    .required(),
  isStepByStepTopics: joi
    .bool()
    .default(false),
  title: joi.string().trim(),
  language: joi
    .number()
    .positive()
    .integer(),
  certificate: joi
    .number()
    .positive()
    .integer(),
  accessTime: joi
    .number()
    .integer()
    .positive(),
  categoriesIds: joi.array().items(
    joi
      .number()
      .positive()
      .integer(),
  ).default([]),
  translations: joi.array().items(joi.object().keys({
    language: joi.number().min(1).integer().required(),
    description: joi.string().trim(),
    welcomeLetter: joi.string().trim(),
    welcomeEmail: joi.string().trim(),
    descriptionShort: joi.string().trim().allow(''),
    systemRequirements: joi.string().trim(),
  })).max(3).default([]),
  topics: joi.array().items(
    joi
      .number()
      .positive()
      .integer(),
  ).default([]),
  timeToComplete: joi
    .number()
    .integer()
    .positive(),
  tutorIds: joi.array().items(
    joi
      .number()
      .positive()
      .integer(),
  ).default([]),
  fileIds: joi.array().items(
    joi
      .number()
      .positive()
      .integer(),
  ).default([]),
  hasPhysical: joi.bool().default(false),
  welcomeLetterTemplateURL: joi.string(),
  welcomeEmailTemplateURL: joi.string(),
  imageUri: joi.string(),
}

export const putCourseTopicsValidation = {
  topics: joi.array().items(
    joi
      .number()
      .positive()
      .integer(),
    joi.string(),
  ),
}

export const putCourseTutorsValidation = {
  tutorIds: joi.array().items(
    joi
      .number()
      .positive()
      .integer(),
  ),
}

export const putCourseFilesValidation = {
  fileIds: joi.array().items(
    joi
      .number()
      .positive()
      .integer(),
  ),
}

export const putCourseStatusValidation = {
  courseId: joi
    .number()
    .positive()
    .integer()
    .required(),
  status: joi
    .string()
    .valid(...Object.values(CourseStatus))
    .required(),
}

export const putCourseTimeValidation = {
  courseStudentId: joi
    .number()
    .positive()
    .integer()
    .required(),
  startAt: joi.date(),
  wishedDoneDate: joi.date(),
}

export const getCourseTopicsSearchValidation = {
  name: joi.string().trim(),
}

export const getFilesTopicsSearchValidation = {
  header: joi.string().trim(),
  createdAt: joi.date(),
}

export const getFilesSearchValidation = {
  name: joi.string().trim(),
  header: joi.string().trim(),
  createdAt: joi.date(),
}

export const putFilesUploadValidation = {
  name: joi
    .string()
    .trim()
    .required(),
  header: joi
    .string()
    .trim()
    .required(),
}

export const postFilesUploadValidation = {
  id: joi
    .number()
    .integer()
    .positive(),
  name: joi
    .string()
    .trim()
    .required(),
  header: joi
    .string()
    .trim()
    .required(),
  topicId: joi
    .number()
    .integer()
    .positive(),
}

export const getFileValidation = {
  createdAt: joi.date(),
}

export const postCourseTopicsValidation = {
  name: joi.string().trim().required(),
  courseId: joi.number().positive().integer().required(),
  id: joi.number().positive().integer()
}

export const postCoursePermissionValidation = {
  permissionLevel: joi.string().required(),
  isRewrite: joi.boolean().required(),
  courses: joi.array()
    .items(
      joi.object().keys({
        id: joi.number().positive().integer().required(),
        permissionItems: joi.array().items(
          joi.object().keys({
            id: joi.number().positive().integer().required(),
            permissionId: joi.number().positive().allow(null).integer().required(),
          })
        ).required(),
      })
    ).required(),
}

export const putCourseTopicsIDValidation = {
  topicName: joi.string().required(),
  topicDescription: joi.string().allow(null).required(),
}

export const getCoursePermission = {
  permissionLevel: joi.string().required(),
  courseIds: joi.array().items(joi.number()),
  ids: joi.array().items(joi.number()),
}

// @flow
import { CertificationType } from './certifications';
import type GroupType from '../groups';

type MyCourseIdentifiersType = {
  id: number
};

type MyCourseType = {
  id: number,
  name: string,
  isLinear: boolean,
  isConsistently: boolean,
  group: number,
  certifications: number[]
};

type MyCourseFullType = {
  id: number,
  name: string,
  certifications: CertificationType[]
};

type MyCoursesFullByGroupType = GroupType & {
  courses: MyCourseFullType[]
};

type MyCoursesByGroupType = GroupType & {
  courses: MyCourseFullType[]
};

export {
  MyCourseIdentifiersType,
  MyCourseType,
  MyCourseFullType,
  MyCoursesByGroupType,
  MyCoursesFullByGroupType,
};

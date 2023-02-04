// @flow
import { USER_ROLES_ENUM } from 'constants/enums';
import { PATHS } from 'constants/paths';

import { HEADER_DICTIONARY } from 'localise';

type LinkType = {
  path: string,
  text: string
};

const { links } = HEADER_DICTIONARY;

const NAV_LINKS: object<LinkType> = {
  dashboard: {
    path: PATHS.dashboard,
    text: links.dashboard,
  },
  courseProspect: {
    path: PATHS.home,
    text: links.coursePropspectus,
  },
  myCourses: {
    path: PATHS.courses,
    text: links.myCourses,
  },
  organisation: {
    path: PATHS.organisations,
    text: links.organisations,
  },
  administrators: {
    path: PATHS.administrators,
    text: links.administrators,
  },
  students: {
    path: PATHS.students,
    text: links.students,
  },
  communication: {
    path: PATHS.communication,
    text: links.communication,
  },
  support: {
    path: PATHS.support,
    text: links.support,
  },
};

const listXpectrum: Array<LinkType> = [
  NAV_LINKS.dashboard,
  NAV_LINKS.myCourses,
  NAV_LINKS.organisation,
  NAV_LINKS.administrators,
  NAV_LINKS.students,
  NAV_LINKS.communication,
];

const listDesigner: Array<LinkType> = [
  NAV_LINKS.myCourses,
  NAV_LINKS.organisation,
  NAV_LINKS.administrators,
  NAV_LINKS.students,
  NAV_LINKS.communication,
];

const listSuperAdmin: Array<LinkType> = [
  NAV_LINKS.myCourses,
  NAV_LINKS.organisation,
  NAV_LINKS.administrators,
  NAV_LINKS.students,
];

const listAdmin: Array<LinkType> = [
  NAV_LINKS.myCourses,
  NAV_LINKS.administrators,
  NAV_LINKS.students,
];

const listTutor: Array<LinkType> = [
  NAV_LINKS.myCourses,
  NAV_LINKS.communication,
];

const listEditor: Array<LinkType> = [
  NAV_LINKS.myCourses,
];

const listStudent: Array<LinkType> = [
  NAV_LINKS.courseProspect,
  NAV_LINKS.myCourses,
  NAV_LINKS.communication,
  NAV_LINKS.support,
];

const listNone: Array<LinkType> = [
  NAV_LINKS.courseProspect,
  NAV_LINKS.myCourses,
];

const renderList = (role: string): Array<LinkType> => {
  switch (role) {
    case (USER_ROLES_ENUM.xpectrum):
      return listXpectrum;
    case (USER_ROLES_ENUM.designer):
      return listDesigner;
    case (USER_ROLES_ENUM.student):
      return listStudent;
    case (USER_ROLES_ENUM.superAdmin):
      return listSuperAdmin;
    case (USER_ROLES_ENUM.admin):
      return listAdmin;
    case (USER_ROLES_ENUM.tutor):
      return listTutor;
    case (USER_ROLES_ENUM.editor):
      return listEditor;
    default: return listNone;
  }
};

export {
  renderList,
  LinkType,
};

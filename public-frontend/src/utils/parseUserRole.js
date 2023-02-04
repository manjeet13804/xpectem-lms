// @flow
import {USER_ROLES_ENUM} from 'constants/enums';
import {ROLES} from 'localise/en';

const {
  xpectum,
  admin,
  superAdmin,
  student,
  designer,
  tutor,
  editor,
} = USER_ROLES_ENUM;


export default (role: string): string => {
  switch (role) {
    case xpectum:
      return ROLES.xpectum;

    case admin:
      return ROLES.administrator;

    case superAdmin:
      return ROLES.superAdministrator;

    case student:
      return ROLES.student;

    case designer:
      return ROLES.designer;

    case tutor:
      return ROLES.tutor;

    case editor:
      return ROLES.editor;

    default:
      return ROLES.none;
  }
};

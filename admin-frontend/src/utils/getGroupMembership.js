import { ROLES } from 'constants/constants';
import getHigherRole from './getHigherRole';

export default (user) => {
  if (!user.groups) {
    return '';
  }
  const higherRole = getHigherRole(user.roles);
  const defaultName = { name: '' };

  const groups = user.groups.length > 0 ? user.groups[0] : defaultName;
  const groupsNames = user.groups.length > 0 ? user.groups.map(({ name }) => name).join(' ,') : '';
  const organisation = groups ? groups.organisation : defaultName;
  const lms = organisation ? organisation.lmsGroup : defaultName;

  switch (higherRole) {
    case ROLES.ADMIN_ORGANISATION:
      return `${lms.name} - ${organisation.name}`;

    case ROLES.ADMIN_GROUP:
      return `${lms.name} - ${organisation.name} - ${groupsNames}`;

    default:
      return '';
  }
};

import { ROLES_NAME } from 'constants/constants';

export default (userRoles = []) => {
  if (userRoles.length === 0) {
    return '';
  }

  const roles = Object.keys(ROLES_NAME);
  const findedHigherRole = roles.find((role) => userRoles.includes(role)) || roles[0];

  return ROLES_NAME[findedHigherRole];
};

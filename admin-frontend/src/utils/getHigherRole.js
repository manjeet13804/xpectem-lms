import { ROLES } from 'constants/constants';

export default (userRoles = []) => {
  const roles = Object.values(ROLES);
  return roles.find((role) => userRoles.includes(role)) || roles[0];
};

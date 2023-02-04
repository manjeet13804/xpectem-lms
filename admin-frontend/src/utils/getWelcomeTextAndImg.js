import { ROLES_NAME, ROLES } from 'constants/constants';
import testCourseLogo from 'assets/images/test-course-logo.png';

const getWelcomeTextByStructure = (structure) => {
  return JSON.parse(structure.translations[0].adminWelcomeText).blocks[0].text || '';
};

export default (user) => {
  if (!user.id) {
    return {};
  }

  const userRoles = user.roles || [];
  const roles = Object.keys(ROLES_NAME);
  const findedHigherRole = roles.find((role) => userRoles.includes(role)) || roles[0];

  const isShowAsSpectrumAdmin = [ROLES.XPECTUM_ADMIN, ROLES.SUPER_ADMIN, ROLES.ADMIN].includes(findedHigherRole);

  if (isShowAsSpectrumAdmin) {
    return { adminWelcomeText: '', logoImg: testCourseLogo };
  }

  const isShowAsLMSAdmin = [ROLES.ADMIN_LMS].includes(findedHigherRole);

  if (isShowAsLMSAdmin) {
    const lmsGroup = user.lmsGroups[0];
    return {
      adminWelcomeText: getWelcomeTextByStructure(lmsGroup),
      logoImg: lmsGroup.logoImageUri,
    };
  }

  const organisation = user.organisations[0];
  const lmsGroupOrganisation = user.groups[0].organisation.lmsGroup;
  return {
    adminWelcomeText: getWelcomeTextByStructure(organisation) || getWelcomeTextByStructure(lmsGroupOrganisation),
    logoImg: organisation.logoImageUri || lmsGroupOrganisation.logoImageUri,
  };
};

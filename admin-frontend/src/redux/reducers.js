import users from 'redux/users/reducer';
import offlineEvents from 'redux/offlineEvents/reducer';
import LanguageSwitcher from './languageSwitcher/reducer';
import ThemeSwitcher from './themeSwitcher/reducer';
import App from './app/reducer';
import Auth from './auth/reducer';
import links from './links/reducer';
import product from './products/reducer';
import createArt from './createArt/reducer';
import zipCodes from './zipCodes/reducer';
import orgAdmins from './orgAdministrators/reducer';
import groups from './groups/reducer';
import groupAdministrators from './groupAdministrators/reducer';
import lmsGroups from './lmsGroups/reducer';
import lmsGroupAdmins from './lmsGroupAdmins/reducer';
import organisations from './organisations/reducer';
import students from './students/reducer';
import courses from './courses/reducer';
import tutors from './tutors/reducer';
import communication from './communication/reducer';
import user from './user/reducer';
import notifications from './notifications/reducer';
import cropImageState from './cropImageState/reducer';
import searchLmsGroup from './searchLmsGroup/reducer';
import searchGroup from './searchGroup/reducer';
import searchOrganisations from './searchOrganisations/reducer';
import certificationsReducer from './certifications/reducer';
import courseCreator from './courseCreator/reducer';
import taxonomy from './taxonomy/reducer';
import techSupport from './techSupport/reducer';
import questionsAndAnswers from './questionsAndAnswers/reducer';
import searchNotification from "./searchNotification/reducer";


export default {
  Auth,
  App,
  ThemeSwitcher,
  LanguageSwitcher,
  users,
  offlineEvents,
  links,
  product,
  createArt,
  zipCodes,
  orgAdmins,
  groups,
  groupAdministrators,
  lmsGroups,
  lmsGroupAdmins,
  organisations,
  students,
  courses,
  tutors,
  communication,
  user,
  notifications,
  cropImageState,
  searchLmsGroup,
  searchGroup,
  searchOrganisations,
  certificationsReducer,
  courseCreator,
  taxonomy,
  techSupport,
  questionsAndAnswers,
  searchNotification,
};

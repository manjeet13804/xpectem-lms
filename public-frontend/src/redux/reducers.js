// @flow
import { combineReducers } from 'redux';
import groups from './groups/reducers';
import usersList from './usersList/reducers';
import userProfile from './userProfile/reducers';
import request from './request/reducers';
import organisations from './organisations/reducers';
import myOrganisations from './myOrganisations/reducers';
import communication from './communication/reducers';
import myCourses from './my-courses/reducers';
import app from './shared/reducers';
import studyPlan from './studyPlan/reducers';
import faq from './faq/reducers';
import myCertificates from './my-certificates/reducers';
import notifications from './notifications/reducers';
import regLink from './reg-links/reducers';

export default (): mixed => combineReducers({
  app,
  userProfile,
  groups,
  usersList,
  request,
  organisations,
  myOrganisations,
  studyPlan,
  myCourses,
  faq,
  myCertificates,
  communication,
  notifications,
  regLink,
});

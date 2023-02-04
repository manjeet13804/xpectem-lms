// @flow
import { all } from 'redux-saga/effects';
import groupSaga from './groups/saga';
import usersListSaga from './usersList/saga';
import asyncRequestSaga from './request/saga';
import userProfileSaga from './userProfile/saga';
import organisationSaga from './organisations/saga';
import studyPlanSaga from './studyPlan/saga';
import myOrganisationSaga from './myOrganisations/saga';
import communicationSaga from './communication/saga';
import myCourseSaga from './my-courses/saga';
import faqSaga from './faq/saga';
import faqSearchSaga from './faq/search/saga';
import certificationsSaga from './my-courses/certifications/saga';
import assignmentsSaga from './my-courses/assignments/saga';
import myCertificatesSaga from './my-certificates/saga';
import notificationsSaga from './notifications/saga';
import getSendMessageSaga from './shared/sages';
import registrationLinkSaga from './reg-links/saga';

export default function* rootSaga(): void {
  yield all([]
    .concat(
      userProfileSaga(),
      groupSaga(),
      usersListSaga(),
      asyncRequestSaga(),
      organisationSaga(),
      myOrganisationSaga(),
      studyPlanSaga(),
      myCourseSaga(),
      faqSaga(),
      faqSearchSaga(),
      certificationsSaga(),
      assignmentsSaga(),
      myCertificatesSaga(),
      communicationSaga(),
      notificationsSaga(),
      getSendMessageSaga(),
      registrationLinkSaga(),
    ));
}

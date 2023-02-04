// @flow
import React, { Node } from 'react';
import { withRouter, ContextRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  ContactUsIcon,
  MapIcon,
  StudentHeader,
  SupportHeader,
  SupportTabs,
  Faq,
  ContactUs,
  SimpleLayout,
} from 'components';
import { bemlds } from 'utils';
import { FaqSections } from 'models';
import { getGeneralUser } from 'redux/userProfile/selectors';
import { SUPPORT_PATHS } from 'constants/paths';
import { SUPPORT } from 'localise';
import './styles.scss';

const ConnectedContactUs = connect(
  (state: mixed): object => ({
    user: getGeneralUser(state),
  }),
)(ContactUs);

const tabs = [
  {
    id: 'faq',
    title: SUPPORT.faq,
    link: SUPPORT_PATHS.support('faq'),
    icon: MapIcon,
    component: (): Node => <Faq section={FaqSections.general} />,
  },
  {
    id: 'contact-us',
    title: SUPPORT.contactUs,
    link: SUPPORT_PATHS.support('contact-us'),
    icon: ContactUsIcon,
    component: ({ className }: object): Node => (
      <div className={className}>
        <ConnectedContactUs />
      </div>
    ),
  },
];

type PropsType = ContextRouter;

const block = bemlds('support');

const SupportPage = ({
  match: {
    params: {
      page,
    },
  },
}: PropsType): Node => {
  const {
    id: activeTabId,
    component: Tab,
  } = tabs.find(
    ({ id }: object): boolean => id === page || !page,
  );

  return (
    <SimpleLayout>
      <StudentHeader />
      <SupportHeader>
        <SupportTabs
          tabs={tabs}
          activeTabId={activeTabId}
        />
      </SupportHeader>
      <Tab className={block()} />
    </SimpleLayout>
  );
};

export default withRouter(SupportPage);

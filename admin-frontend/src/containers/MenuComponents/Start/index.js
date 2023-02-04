import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import lmsGroupsActions from 'redux/lmsGroups/actions';
import LayoutContent from 'components/utility/layoutContent';
import { higherRole, getWelcomeTextAndImg } from 'utils';
import StartWrapper from './start.style';

const Start = ({ user }) => {
  const { adminWelcomeText, logoImg } = useMemo(() => {
    const currentStructure = getWelcomeTextAndImg(user);

    return currentStructure;
  }, [user]);

  const mainText = useMemo(
    () => `Hi ${user.firstName || 'user'}!
  Welcome as ${higherRole(user.roles)}.
  
  ${adminWelcomeText}`,
    [user, adminWelcomeText]
  );

  return (
    <LayoutContent>
      <StartWrapper>
        <section className='about-company'>
          <img className='logo' src={logoImg} alt='Course logo' />
          <span className='text'>{mainText}</span>
        </section>
      </StartWrapper>
    </LayoutContent>
  );
};

export default connect(({ user }) => user, { ...lmsGroupsActions })(Start);

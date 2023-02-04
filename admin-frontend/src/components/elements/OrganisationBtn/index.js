import React from 'react';
import { ArrowRightIcon } from 'components';
import { NavLink } from 'react-router-dom';
import OrgSwitchStyleWrapper from './organisationBtn.style';

const defaultProps = {
  name: '',
};

const OrganisationBtn = (props) => {
  const { name } = props;
  return (
    <OrgSwitchStyleWrapper>
      <NavLink className="link" to={'/'}>
        <div className="input">
          <div className="icon-text">
            <span className="text">{name}</span>
          </div>
          <ArrowRightIcon className="icon-arrow" />
        </div>
      </NavLink>
    </OrgSwitchStyleWrapper>
  );
};

OrganisationBtn.defaultProps = defaultProps;

export default OrganisationBtn;

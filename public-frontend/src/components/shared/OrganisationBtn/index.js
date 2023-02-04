// @flow
import React from 'react';
import block from 'utils/bem';
import { PATHS } from 'constants/paths';
import './organisationbtn.scss';
import { ArrowRightIcon } from 'components';
import { NavLink } from 'react-router-dom';

type PropsType = {
  name?: string
};

const defaultProps = {
  name: null,
};

const bem = block('link');

const OrganisationBtn = (props: PropsType): Node => {
  const { name } = props;
  return (
    <NavLink className={bem()} to={PATHS.studentCourses}>
      <div className={bem('input')}>
        <div className={bem('icon-text')}>
          <span className={bem('text')}>{name}</span>
        </div>
        <ArrowRightIcon className={bem('icon-arrow')} />
      </div>
    </NavLink>
  );
};

OrganisationBtn.defaultProps = defaultProps;

export default OrganisationBtn;

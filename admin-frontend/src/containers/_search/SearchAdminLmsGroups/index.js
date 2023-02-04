import React, { useState } from 'react';
import { SearchPersonForm, IntlMessages } from 'components';
import { connect } from 'react-redux';
import lmsGroupAdminsActions from 'redux/lmsGroupAdmins/actions';
import {
  getCurrentAdminFp,
} from 'selectors';
import _ from 'lodash';
import { bemlds } from 'utils';

const SearchAdminLmsGroups = ({
  searchAdmins,
  lmsGroupId,
  clearLms,
  titleInput,
}) => {
  const b = bemlds('search-organisations');

  const [state, changeState] = useState({
    firstName: '',
    lastName: '',
    isDeactivated: false,
    firstEmail: '',
    firstTelephone: '',
  });
  const handleChangeEmail = (email) => {
    changeState({
      ...state,
      firstEmail: email,
    });
  };

  const handleChangePhone = (phone) => {
    changeState({
      ...state,
      firstTelephone: phone,
    });
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'email') {
      handleChangeEmail(value);

      return;
    }

    if (name === 'phone') {
      handleChangePhone(value);

      return;
    }
    changeState({
      ...state,
      [name]: value,
    });
  };
  const handleSearch = () => {
    clearLms();
    const params = Object.entries(state).reduce((acc, item) => ({
      ...acc,
      [item[0]]: item[1] || undefined,
    }), {});
    const fieldsForSearch = ['firstName', 'lastName', 'isDeactivated'];
    const queryForSearch = _.pick(params, fieldsForSearch);
    searchAdmins({
      ...queryForSearch,
      lmsGroup: lmsGroupId,
      email: params.firstEmail,
      phone: params.firstTelephone,
    });
  };

  return (
    <div>
      <div className={b('title-input')}>
        {titleInput}
      </div>
      <SearchPersonForm
        {...state}
        onChange={handleChange}
        checkboxLabel={<IntlMessages id="groupAdmins.includeDeactivated" />}
        onSearch={handleSearch}
        findButtonTextId="lmsGroups.admin.searchAdmin"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  const currentAdmin = getCurrentAdminFp(state);

  return {
    currentAdmin,
  };
};

export default connect(mapStateToProps, { ...lmsGroupAdminsActions })(SearchAdminLmsGroups);

import React from 'react';
import PropTypes from 'prop-types';
import { bemlds } from 'utils';
import RegLinkTableBody from './RegLinkTableBody';

const b = bemlds('reglink-table');
const item = bemlds('reglink-item');

const propTypes = {
  data: PropTypes.arr,
  handleUpdateRegLinkStatus: PropTypes.func,
  handleDeleteRegistrationLink: PropTypes.func,
  loadingUpadateRegistrationLinks: PropTypes.bool,
  loadingDeleteRegistrationLinks: PropTypes.bool,
};

const defaultProps = {
  data: {},
  handleUpdateRegLinkStatus: () => null,
  handleDeleteRegistrationLink: () => null,
  loadingUpadateRegistrationLinks: false,
  loadingDeleteRegistrationLinks: false,
};

const RegLinkElementsTable = (props) => {
  const {
    data,
    handleUpdateRegLinkStatus,
    handleDeleteRegistrationLink,
    loadingUpadateRegistrationLinks,
    loadingDeleteRegistrationLinks,
  } = props;

  const isDisabled = loadingUpadateRegistrationLinks || loadingDeleteRegistrationLinks;

  return (
    <table className={b()}>
      <thead className={b('header')}>
        <tr className={b('row')}>
          <th className={b('col')}><span>Course</span></th>
          <th className={b('col')}>
            <div className={item()}>
              <span>Registration link</span>
              <span className={item('thin')}>Copy and paste the link where applicable</span>
            </div>
          </th>
          <th className={b('col')}><span>Active</span></th>
          <th className={b('col')}><span>Delete</span></th>
        </tr>
      </thead>
      <RegLinkTableBody
        data={data}
        handleUpdateRegLinkStatus={handleUpdateRegLinkStatus}
        handleDeleteRegistrationLink={handleDeleteRegistrationLink}
        isDisabled={isDisabled}
      />
    </table>
  );
};

RegLinkElementsTable.propTypes = propTypes;
RegLinkElementsTable.defaultProps = defaultProps;

export default RegLinkElementsTable;

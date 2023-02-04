// @flow
import React, { Node, Component } from 'react';
import { bemlds } from 'utils';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { actionCurrentProfile } from 'redux/actions';
import { getUserProfile } from 'redux/selectors';
import { EDIT_PROFILE } from 'localise';
import {
  StudentHeader,
  EditProfileForm,
  ResetPasswordBlock,
  ExportDataBlock,
  CloseAccountBlock,
  SimpleLayout,
} from 'components';
import EditProfileSubheader from './EditProfileSubheader';
import './styles.scss';

const b = bemlds('edit-profile-page');

const { title } = EDIT_PROFILE;

type PropType = {
  profileData: object,
  getProfileData: () => void
};

class EditProfilePage extends Component<PropType> {
  componentDidMount() {
    const { getProfileData } = this.props;
    getProfileData();
  }

  render(): Node {
    const { profileData } = this.props;
    if (!profileData || !Object.keys(profileData).length) {
      return null;
    }

    return (
      <SimpleLayout>
        <StudentHeader />
        <div className={b('page-wrap')}>
          <span className={b('title')}>{title}</span>
          <hr className={b('separator')} />
          <div className={b('content')}>
            <EditProfileSubheader />
            <EditProfileForm className={b('user-form')} />
            <hr className={b('separator', {'in-form': true})} />
            <ResetPasswordBlock className={b('reset-password')} />
            <hr className={b('separator', {'in-form': true})} />
            <ExportDataBlock className={b('export-data')} />
            <hr className={b('separator', {'in-form': true})} />
            <CloseAccountBlock className={b('close-account')} />
          </div>
        </div>
      </SimpleLayout>
    );
  }
}

const mapStateToProps = (state: object): object => ({
  profileData: getUserProfile(state),
});

const mapDispatchToProps = {
  getProfileData: actionCurrentProfile,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditProfilePage),
);

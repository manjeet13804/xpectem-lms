import React, { Component } from 'react';
import { connect } from 'react-redux';
import { socketInit } from 'websocket';
import { notificationsListener } from 'websocket/listeners';
import Loader from 'components/utility/loader';
import appActions from 'redux/app/actions';
import authAction from 'redux/auth/actions';
import getGroupMembership from 'utils/getGroupMembership';
import Popover from 'components/uielements/popover';
import IntlMessages from 'components/utility/intlMessages';
import TopbarDropdownWrapper from './topbarDropdown.style';

const { logout } = authAction;
const { clearMenu } = appActions;

class TopbarUser extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    socketInit();

    notificationsListener.subscribe();
  }

  componentWillUnmount() {
    notificationsListener.unsubscribe();
  }

  hide() {
    this.setState({ visible: false });
  }

  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const { logout, email, lmsGroup, clearMenu, user } = this.props;
    const { visible } = this.state;

    const groupMembership = getGroupMembership(user.user);

    const content = (
      <TopbarDropdownWrapper className='isoUserDropdown'>
        <button
          className='isoDropdownLink'
          onClick={() => {
            logout();
            clearMenu();
          }}
        >
          <IntlMessages id='topbar.logout' />
        </button>
      </TopbarDropdownWrapper>
    );

    return (
      <Popover
        content={content}
        trigger='click'
        visible={visible}
        onVisibleChange={this.handleVisibleChange}
        arrowPointAtCenter
        placement='bottomLeft'
      >
        {!email ? (
          <Loader />
        ) : (
          <div>
            <h3 className='isoWidgetLabel userLabel'>{groupMembership || lmsGroup}</h3>
            <div className='isoImgWrapper'>
              <h3 className='isoWidgetLabel userLabel'>{email}</h3>
              <span className='userActivity online' />
            </div>
          </div>
        )}
      </Popover>
    );
  }
}

const mapStateToProps = ({ Auth: { email, lmsGroup }, user }) => ({ email, lmsGroup, user });

export default connect(mapStateToProps, { logout, clearMenu })(TopbarUser);

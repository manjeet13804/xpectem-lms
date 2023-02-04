// @flow
import React, { Node, Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { PATHS } from 'constants/paths';
import { DEFAULT_USER_AVATAR } from 'constants/mock';
import { HEADER_DICTIONARY, TERM_SHARED } from 'localise';
import { bemlds } from 'utils';
import { actionLoginOff } from 'redux/actions';
import { getGeneralUser } from 'redux/userProfile/selectors';
import { UserType } from 'models';
import { socketClose } from 'websocket';
import './styles.scss';

const { links: { profile } } = HEADER_DICTIONARY;
const { logout } = TERM_SHARED;

const b = bemlds('menu-account');

const { profile: profileLink } = PATHS;

const DefaultProps = {
  className: '',
};

type PropType = {
  user: UserType,
  logoutAction: () => void,
  className?: string,
  history: object
};

class MenuAccount extends Component<PropType> {
  constructor(props: PropType) {
    super(props);
    this.block = null;
    this.state = { isOpen: false };
  }

  componentDidMount() {
    document.addEventListener('click', this.checkClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.checkClick);
  }

  checkClick = (e: SyntheticEvent) => {
    const isBlockClick = this.block.contains(e.target);
    if (!isBlockClick) {
      this.closeMenu();
    }
  };

  openMenu = () => {
    this.setState({isOpen: true});
  };

  closeMenu = () => {
    this.setState({isOpen: false});
  };

  logoutClick = () => {
    const { logoutAction, history } = this.props;
    socketClose();
    logoutAction();
    history.push('/');
  };

  saveRoot = (node: SyntheticEvent) => {
    this.block = node;
  };

  render(): Node {
    const { isOpen } = this.state;
    const {
      user: {
        firstName,
        lastName,
        email,
        avatar,
      },
      className,
    } = this.props;

    return (
      <section className={b({ mix: className })} ref={this.saveRoot}>
        <button className={b('menu-button')} type="button" onClick={this.openMenu}>
          <img className={b('user-icon')} src={avatar || DEFAULT_USER_AVATAR} alt="User" />
        </button>
        {isOpen && (
          <div className={b('menu-block')}>
            <div className={b('menu-header')}>
              <span className={b('name')}>{`${firstName} ${lastName}`}</span>
              <span className={b('email')}>{email}</span>
            </div>
            <div className={b('menu-list')}>
              <Link
                to={profileLink}
                className={b('menu-list-item')}
                onClick={this.closeMenu}
              >
                {profile}
              </Link>
              <button className={b('logout-btn')} type="button" onClick={this.logoutClick}>
                {logout}
              </button>
            </div>
          </div>
        )
        }
      </section>
    );
  }
}

MenuAccount.defaultProps = DefaultProps;

const mapDispatchToProps = {
  logoutAction: actionLoginOff,
};

export default withRouter(connect(
  (state: mixed): object => ({
    user: getGeneralUser(state),
  }),
  mapDispatchToProps,
)(MenuAccount));

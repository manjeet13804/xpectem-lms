import React, { Component, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { bemlds } from 'utils';
import { Icon } from 'antd';
import { IntlMessages } from 'components';
import { convertFromRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import userActions from 'redux/user/actions';
import { MenuNoticeWrapper } from './menuNotice.styles';
import NotificationTypeElement from '../../../components/elements/NotificationTypeElement';

const b = bemlds('menuNotice');

const DefaultProps = {
  notifications: [],
};



type PropType = {
  notifications: any[],
  remove: (notificationId: number) => void
};


class MenuNotice extends Component<PropType> {
  state = {
    isOpen: false,
  };

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
    const { isOpen } = this.state;
    this.setState({isOpen: !isOpen});
  };

  closeMenu = () => {
    this.setState({isOpen: false});
  };

  saveRoot = (node: SyntheticEvent) => {
    this.block = node;
  };

  getMessage = message => EditorState.createWithContent(convertFromRaw(JSON.parse(message)));

  render() {
    const { isOpen } = this.state;
    const { notifications, remove } = this.props;

    return (
      <MenuNoticeWrapper className={b()}>
        <section ref={this.saveRoot}>
          <button className={b('menu-button')} type="button" onClick={this.openMenu}>
            {!!notifications.length && <div className={b('counter')}>{notifications.length}</div>}
            <Icon type="bell" />
          </button>
          {isOpen && (
            <div className={b('menu-block')}>
              <p className={b('title')}>
                <IntlMessages id="notification.title" />
              </p>
              {notifications.map(
                (
                  {
                    id,
                    heading,
                    message,
                    type,
                  }: NotificationType,
                ) => (
                  <div className={b('notification-item')} key={id}>
                    <div className={b('notification-body')}>
                      <NotificationTypeElement notificationType={type} />
                      <div>
                        <span className={b('notification-title')}>{heading}</span>
                        <Editor
                          editorState={this.getMessage(message)}
                          toolbarHidden
                          editorClassName={b('notification-text')}
                        />
                      </div>
                    </div>
                    <hr className={b('notification-separator')} />
                    <button
                      className={b('remove-btn')}
                      onClick={() => remove(id)}
                    >
                      <IntlMessages id="notification.removeNotification" />
                    </button>
                  </div>
                ))}
              {notifications.length === 0 && (
                <div className={b('empty')}>
                  <p className={b('empty-header')}>
                    <IntlMessages id="notification.emptyTitle" />
                  </p>
                  <p className={b('empty-description')}>
                    <IntlMessages id="notification.emptyDescription" />
                  </p>
                </div>
              )}
            </div>
          )}
        </section>
      </MenuNoticeWrapper>
    );
  }
}

MenuNotice.defaultProps = DefaultProps;

const mapStateToProps = (state: object): object => ({
  notifications: state.user.notifications,
});

const mapDispatchToProps = {
  remove: userActions.removeNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuNotice);

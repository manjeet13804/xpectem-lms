import React, { Node, Component } from 'react';
import { connect } from 'react-redux';
import { bemlds } from 'utils';
import { NotificationType } from 'models';
import { NoticeIcon, ArrowInCircleIcon } from 'components';
import { NOTIFICATIONS_DICTIOANARY } from 'localise';
import { getNotifications, removeNotification } from 'redux/actions';
import { getNotificationsAsArray } from 'redux/selectors';
import './styles.scss';
import { notificationsListener } from 'websocket/listeners';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw, EditorState } from 'draft-js';
import { socketInit } from 'websocket';
import NotificationTypeElement from 'components/elements/NotificationTypeElement';

const {
  title,
  removeNotification: removeNotificationTitle,
  emptyTitle,
  emptyDescription,
} = NOTIFICATIONS_DICTIOANARY;

const b = bemlds('menu-notice');

const DefaultProps = {
  className: '',
};

type PropType = {
  className?: string,
  notifications: NotificationType[],
  fetch: () => void,
  remove: (notificationId: number) => void
};


class MenuNotice extends Component<PropType> {
  state = {
    isOpen: false,
  };

  componentDidMount() {
    const { fetch } = this.props;
    socketInit();
    fetch();

    document.addEventListener('click', this.checkClick);
    notificationsListener.subscribe();
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.checkClick);
    notificationsListener.unsubscribe();
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

  render(): Node {
    const { isOpen } = this.state;
    const { className, notifications, remove } = this.props;

    return (
      <section className={b({ mix: className })} ref={this.saveRoot}>
        <button className={b('menu-button')} type="button" onClick={this.openMenu}>
          {!!notifications.length && <div className={b('counter')}>{notifications.length}</div>}
          <NoticeIcon className={b('icon')} />
        </button>
        {isOpen && (
          <div className={b('menu-block')}>
            <span className={b('title')}>{title}</span>
            {notifications.map(
              (
                {
                  id,
                  heading,
                  message,
                  link,
                  linkText,
                  type,
                }: NotificationType,
              ): Node => (
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
                      {(link && linkText) && (
                        <a className={b('notification-link')} href={link}>
                          <ArrowInCircleIcon className={b('arrow-icon')} />
                          <span className={b('link-text')}>{linkText}</span>
                        </a>
                      )}
                    </div>
                  </div>
                  <hr className={b('notification-separator')} />
                  <button className={b('remove-btn')} type="button" onClick={(): void => remove(id)}>{removeNotificationTitle}</button>
                </div>
              ),
            )}
            {notifications.length === 0 && (
              <div className={b('empty')}>
                <h3 className={b('empty-header')}>{emptyTitle}</h3>
                <div className={b('empty-description')}>{emptyDescription}</div>
              </div>
            )}
          </div>
        )
        }
      </section>
    );
  }
}

MenuNotice.defaultProps = DefaultProps;

const mapStateToProps = (state: object): object => ({
  notifications: getNotificationsAsArray(state),
});

const mapDispatchToProps = {
  fetch: getNotifications,
  remove: removeNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuNotice);

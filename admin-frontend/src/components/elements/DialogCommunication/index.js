import React, { PureComponent } from 'react';
import { bemlds, downloadFile } from 'utils';
import {
  Avatar,
  Icon,
} from 'antd';
import communicationActions from 'redux/communication/actions';
import {
  AddMessageCommunication,
  MessageCommunication,
  EditHeaderDialog,
  ReasignDialog,
} from 'components';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import Modal from 'components/feedback/modal';
import { DATE_FORMATS } from 'constants/constants';
import IntlMessages from 'components/utility/intlMessages';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw, EditorState } from 'draft-js';
import DialogCommunicationWrapper from './dialogCommunication.style';
import DefaultButton from '../../defaultButton';

const defaultProps = {
  currentStudents: null,
  dialog: null,
  addMessage: null,
  editHeaderDialog: null,
  admins: [],
  reasignAdmin: null,
  previousOpen: false,
  setDialogCompleted: () => null,
};

const propTypes = {
  currentStudents: PropTypes.arrayOf(PropTypes.object),
  dialog: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    author: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      avatar: PropTypes.string,
    }),
    createdAt: PropTypes.string,
    heading: PropTypes.string,
    message: PropTypes.string,
    communicationAttachment: PropTypes.arrayOf(PropTypes.object),
    communicationMessage: PropTypes.arrayOf(PropTypes.object),
  }),
  addMessage: PropTypes.func,
  editHeaderDialog: PropTypes.func,
  admins: PropTypes.arrayOf(PropTypes.object),
  reasignAdmin: PropTypes.func,
  previousOpen: PropTypes.bool,
  setDialogCompleted: PropTypes.func,
};

const getMessageFromEditor = text => EditorState.createWithContent(convertFromRaw(JSON.parse(text)));

const { dayMonth, dayMonthTime } = DATE_FORMATS;

const b = bemlds('dialog-communication');

const { readMassages } = communicationActions;

class DialogCommunication extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isToggleDialog: false,
      isShowModalReasign: false,
      isShowModalEdit: false,
    };
  }

  hendleReadDialog = () => {
    const {
      dialog,
    } = this.props;
    const isReading = dialog.communicationMessage.some(item => !item.isAdminChecked);
    return isReading;
  }

  componentDidMount = () => {
    const {
      previousOpen,
    } = this.props;

    if (previousOpen && this.hendleReadDialog()) {
      const { dialog } = this.props;
      const { id } = dialog;
      readMassages(id);
    }
    this.setState({ isToggleDialog: previousOpen });
  }

  onToggleDialog = () => {
    const {
      isToggleDialog,
    } = this.state;

    if (!isToggleDialog && this.hendleReadDialog()) {
      const { dialog } = this.props;
      const { id } = dialog;
      readMassages(id);
    }
    this.setState({ isToggleDialog: !isToggleDialog });
  };

  openModalReasign = () => (this.setState({ isShowModalReasign: true }));

  closeModalReasign = () => (this.setState({ isShowModalReasign: false }));


  openModalEdit = () => (this.setState({ isShowModalEdit: true }));

  closeModalEdit = () => (this.setState({ isShowModalEdit: false }));

  render() {
    const {
      isToggleDialog,
      isShowModalEdit,
      isShowModalReasign,
    } = this.state;

    const {
      dialog,
      currentStudents,
      addMessage,
      editHeaderDialog,
      admins,
      reasignAdmin,
      abortMessage,
      setDialogCompleted,
      userId,
      deleteLastMessage,
      deleteDialog,
    } = this.props;

    const {
      id,
      author,
      createdAt,
      heading,
      message,
      communicationAttachment,
      communicationMessage,
      isClosed,
      accepter,
    } = dialog;

    if (!author) { return null; }

    const createdDialog = moment(createdAt).format(dayMonth);
    const createdDialogWithTime = moment(createdAt).format(dayMonthTime);

    const actualMessages = communicationMessage
      ? communicationMessage.filter((item, i) => i !== 0) : [];

    const {
      firstName,
      lastName,
      avatar,
    } = author;

    return (
      <DialogCommunicationWrapper>
        <div className={b()}>
          {isToggleDialog ? (
            <div className={b('form')}>
              <div
                onClick={this.onToggleDialog}
                className={b('form-title')}
                role="button"
                tabIndex="-1"
              >
                <div className={b('form-title-avatar')}>
                  <Avatar
                    size={32}
                    icon="user"
                    src={avatar}
                  />
                </div>
                <div className={b('form-title-row')}>
                  <div className={b('form-title-name')}>
                    <span className={b('form-title-name-firstname')}>
                      {firstName}
                    </span>
                    <span>
                      {lastName}
                    </span>
                  </div>
                  <div className={b('form-title-date')}>
                    {createdDialogWithTime}
                  </div>
                </div>
              </div>
              <div className={b('form-input')}>
                <div className={b('form-input-text')}>
                  <span className={b('unbordered')}>{heading}</span>
                </div>
                <div className={b('form-input-text')}>
                  <Editor
                    editorState={getMessageFromEditor(message)}
                    toolbarHidden
                    editorClassName={b('editor')}
                  />
                </div>
              </div>
              {communicationAttachment.length > 0 && (
                <div className={b('attached')}>
                  <div className={b('attached-header')}>
                    <IntlMessages id="students.attached" />
                  </div>
                  {communicationAttachment.map(({ id: idAttachment, originalName, uri }) => (
                    <div
                      className={b('attached-link-download')}
                      role="button"
                      key={idAttachment}
                      onClick={() => downloadFile(uri, originalName)}
                      tabIndex={-1}
                    >
                      {originalName}
                    </div>
                  ))}
                </div>
              )}
              {actualMessages && actualMessages.map((item, index) => (
                <MessageCommunication
                  key={item.id}
                  index={index}
                  itemMessage={item}
                  dialogId={id}
                  userId={userId}
                  messageCount={actualMessages.length}
                  handleDeleteMessage={deleteLastMessage}
                />
              ))}
              {!isClosed && (
                <div>
                  <AddMessageCommunication
                    currentStudents={currentStudents}
                    dialogId={id}
                    addMessage={addMessage}
                    abortMessage={abortMessage}
                  />
                  <div className={b('button')}>
                    <button
                      type="button"
                      className={b('button-btn', { reasign: true })}
                      onClick={() => setDialogCompleted(id)}
                    >
                      <IntlMessages id="students.communicationMarkComplete" />
                    </button>
                    <button
                      type="button"
                      className={b('button-btn', { reasign: true })}
                      onClick={this.openModalReasign}
                    >
                      <IntlMessages id="students.communicationReasign" />
                    </button>
                    <button
                      className={b('button-btn')}
                      onClick={this.openModalEdit}
                      type="button"
                    >
                      <IntlMessages id="students.communicationEditHeader" />
                    </button>
                  </div>
                </div>
              )}
              <div>
                {accepter
                  ? (
                    <div className={b('footer')}>
                      <div>
                        <IntlMessages id="students.communicationAssignedTo" />
                        {` ${accepter.firstName} ${accepter.lastName}`}
                      </div>
                      <DefaultButton
                        onClick={() => deleteDialog(id)}
                        textId="students.deleteDialog"
                        isDelete
                      />
                    </div>
                  )
                  : (
                    <div className={b('button')}>
                      <DefaultButton
                        onClick={() => deleteDialog(id)}
                        textId="students.deleteDialog"
                        isDelete
                      />
                    </div>
                  )
              }
              </div>
            </div>
          ) : (
            <div
              className={b('item')}
              onClick={this.onToggleDialog}
              role="button"
              tabIndex="-1"
            >
              <div className={b('item-title')}>
                <div>
                  <span className={b('item-title-firstname')}>
                    {firstName}
                  </span>
                  <span>{lastName}</span>
                </div>
                <div className={b('item-title-date')}>
                  {createdDialog}
                </div>
              </div>
              <div className={b('item-body')}>
                <div className={b('item-body-heading')}>
                  {heading}
                </div>
                <div className={b('item-body-icon')}>
                  <Icon type="down" />
                </div>
              </div>
              {isClosed && (
              <div className={b('item-body-closed')}>
                <IntlMessages id="students.communicationClosedLabel" />
              </div>
              )}
            </div>
          )}
        </div>
        <Modal
          visible={isShowModalEdit}
          onCancel={this.closeModalEdit}
          footer={null}
        >
          <EditHeaderDialog
            currentHeader={heading}
            editHeaderDialog={editHeaderDialog}
            dialogId={id}
            closeModal={this.closeModalEdit}
          />
        </Modal>
        {isShowModalReasign && (
          <Modal
            visible={isShowModalReasign}
            onCancel={this.closeModalReasign}
            footer={null}
          >
            <ReasignDialog
              admins={admins}
              dialogId={id}
              reasignAdmin={reasignAdmin}
              closeModal={this.closeModalReasign}
            />
          </Modal>
        )}
      </DialogCommunicationWrapper>
    );
  }
}

DialogCommunication.propTypes = propTypes;
DialogCommunication.defaultProps = defaultProps;

export default DialogCommunication;

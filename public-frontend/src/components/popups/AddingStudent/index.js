// @flow
import React, {Component} from 'react';
import {
  PopupContainer,
  AddingNewStudentForm,
  SwitchForm,
  UploadFileStudentForm,
} from 'components';
import {TERM_SHARED, FORMS} from 'localise';
import {connect} from 'react-redux';
import {actionRequest, actionAddGroup} from 'redux/actions';
import {getRequestStatus} from 'redux/selectors';
import {IMPORT_USERS} from 'constants/apiUrls';

type PropsType = {
  close: () => void,
  request: () => void,
  requestStatus: boolean
};

const first = 'first';
const second = 'second';

class AddingStudent extends Component<PropsType> {
  constructor(props: PropsType) {
    super(props);

    this.state = {
      activePage: first,
    };
  }

  switchImport = () => {
    this.setState({activePage: second});
  }

  switchStudents = () => {
    this.setState({activePage: first});
  };

  importFile = (file: object) => {
    const {request, close} = this.props;
    request({
      method: 'POST',
      file,
      isToken: true,
      url: IMPORT_USERS,
      callback: () => {
        close();
      },
    });
  };

  onSubmit = (values: object, { setSubmitting }: object) => {
    setSubmitting(false);
  };

  render(): Node {
    const {close, requestStatus} = this.props;
    const {activePage} = this.state;
    return (
      <PopupContainer isRequestDefault close={close}>
        <SwitchForm
          firstComponentName={TERM_SHARED.addStudent}
          secondComponentName={FORMS.importStudentList}
          firstComponentAction={this.switchStudents}
          secondComponentAction={this.switchImport}
          activePage={activePage}
        />
        {requestStatus ? close() : null}
        {activePage === first ? (
          <AddingNewStudentForm
            close={close}
            onSubmit={this.onSubmit}
          />
        ) : <UploadFileStudentForm importFile={this.importFile} />}
      </PopupContainer>
    );
  }
}

const mapStateToProps = (state: object): object => ({
  requestStatus: getRequestStatus(state),
});

const mapDispatchToProps = {
  request: actionRequest,
  addGroup: actionAddGroup,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddingStudent);

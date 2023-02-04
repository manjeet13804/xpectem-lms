import React, { PureComponent } from 'react';
import { bemlds } from 'utils';
import { Input } from 'antd';
import IntlMessages from 'components/utility/intlMessages';
import { PropTypes } from 'prop-types';
import { DragAndDropAllTypes, DefaultButton } from 'components';
import {
  Search,
} from 'semantic-ui-react';
import { acceptedFileTypes } from 'constants/constants';
import EditFileDialogWrapper from './editFileDialog.style';

const defaultProps = {
  currentHeader: '',
  currentName: '',
  closeModal: null,
  file: {
    id: null,
  },
  deleteFileOfCourse: null,
  changeFileOfCourse: null,
  hideFile: false,
  tutorFile: false,
  headerInputType: '',
  autoCompleteOptions: [],
};

const propTypes = {
  currentHeader: PropTypes.string,
  currentName: PropTypes.string,
  closeModal: PropTypes.func,
  file: PropTypes.shape({
    id: PropTypes.number,
  }),
  deleteFileOfCourse: PropTypes.func,
  changeFileOfCourse: PropTypes.func,
  hideFile: PropTypes.bool,
  tutorFile: PropTypes.bool,
  headerInputType: PropTypes.string,
  autoCompleteOptions: PropTypes.arrayOf(PropTypes.string),
};

const b = bemlds('edit-file-dialog');

class EditFileDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      header: '',
      name: '',
      file: null,
      results: [],
    };
  }

  componentDidMount() {
    const {
      currentHeader,
      currentName,
      autoCompleteOptions,
    } = this.props;

    this.setState({
      header: currentHeader,
      name: currentName,
      options: autoCompleteOptions,
    });
  }

  changeTitle = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  editFile = (fileId) => {
    const {
      header,
      name,
      file,
    } = this.state;

    const {
      changeFileOfCourse,
      closeModal,
    } = this.props;

    changeFileOfCourse(header, name, file, fileId);
    closeModal();
  };

  deleteFile = (fileId) => {
    const {
      deleteFileOfCourse,
      closeModal,
    } = this.props;
    deleteFileOfCourse(fileId);
    closeModal();
  };

  handleAddFileInEdit = (file) => {
    this.setState({ file });
  };

  handleSearchChangeHeader = (e, { value }) => {
    const { options } = this.state;
    const filteredResults = options.filter(item => item.value.includes(value));
    const results = filteredResults.map(item => ({
      title: item.value,
    }));
    this.setState({
      results,
      header: value,
    });
  }

  handleSelectResult = (e, { result }) => {
    this.setState({
      header: result.title,
    });
  }

  getHeaderInput = () => {
    const { headerInputType } = this.props;
    const { header, results } = this.state;

    switch (headerInputType) {
      case 'autocomplete': {
        return (
          <div className={b('search-input')}>
            <Search
              results={results}
              value={header}
              onSearchChange={this.handleSearchChangeHeader}
              onResultSelect={this.handleSelectResult}
            />
          </div>
        );
      }

      default: {
        return (
          <Input
            value={header}
            name="header"
            onChange={e => this.changeTitle(e)}
          />
        );
      }
    }
  }


  render() {
    const { name } = this.state;
    const {
      currentName,
      file: { id },
      hideFile,
      tutorFile,
    } = this.props;

    return (
      <EditFileDialogWrapper>
        <div className={b()}>
          <div className={b('title')}>
            <IntlMessages id="course.fileEditTitle" />
            <span>{currentName}</span>
          </div>
          <div className={b('input')}>
            <div className={b('input-title')}>
              {tutorFile ? <IntlMessages id="tutors.folderWord" /> : <IntlMessages id="course.fileTitleHeader" />}
            </div>
            {this.getHeaderInput()}
          </div>
          <div className={b('input')}>
            <div className={b('input-title')}>
              <IntlMessages id="course.fileTitleName" />
            </div>
            <Input
              value={name}
              name="name"
              onChange={e => this.changeTitle(e)}
            />
          </div>
          {!hideFile && (
            <div className={b('input')}>
              <div className={b('input-title')}>
                <IntlMessages id="course.fileUploadLabel" />
              </div>
              <DragAndDropAllTypes
                numberUpload="2"
                fileTypes={acceptedFileTypes}
                handleDrop={this.handleAddFileInEdit}
                handleAddFile={this.handleAddFileInEdit}
              />
            </div>
          )}
          <div className={b('button')}>
            <DefaultButton
              onClick={() => this.deleteFile(id)}
              textId="course.fileButtonDelete"
              isDelete
            />
            <DefaultButton
              onClick={() => this.editFile(id)}
              textId="course.fileButtonSave"
            />
          </div>
        </div>
      </EditFileDialogWrapper>
    );
  }
}

EditFileDialog.propTypes = propTypes;
EditFileDialog.defaultProps = defaultProps;

export default EditFileDialog;

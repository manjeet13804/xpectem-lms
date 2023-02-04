import React, { PureComponent } from 'react';
import { bemlds } from 'utils';
import { Input } from 'antd';
import IntlMessages from 'components/utility/intlMessages';
import { PropTypes } from 'prop-types';
import EditHeaderDialogWrapper from './editHeaderDialog.style';

const defaultProps = {
  dialogId: null,
  currentHeader: '',
  editHeaderDialog: null,
  closeModal: null,
};

const propTypes = {
  dialogId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  currentHeader: PropTypes.string,
  editHeaderDialog: PropTypes.func,
  closeModal: PropTypes.func,
};


const b = bemlds('edit-header-dialog');

class EditHeaderDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      header: '',
    };
  }

  componentWillMount() {
    const { currentHeader } = this.props;

    this.setState({ header: currentHeader });
  }

  addHeader = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  editHeader = () => {
    const { header } = this.state;
    const {
      editHeaderDialog,
      dialogId,
      closeModal,
    } = this.props;

    editHeaderDialog(dialogId, header);
    closeModal();
  };

  render() {
    const { header } = this.state;

    return (
      <EditHeaderDialogWrapper>
        <div className={b()}>
          <div className={b('title')}>
            <IntlMessages id="students.communicationTitleEdit" />
          </div>
          <div className={b('input')}>
            <div className={b('input-title')}>
              <IntlMessages id="students.communicationTitleInput" />
            </div>
            <Input
              value={header}
              name="header"
              onChange={e => this.addHeader(e)}
            />
          </div>
          <div className={b('button')}>
            <button
              className={b('button-btn')}
              type="button"
              onClick={this.editHeader}
              disabled={!header}
            >
              <IntlMessages id="students.qaButtonSave" />
            </button>
          </div>
        </div>
      </EditHeaderDialogWrapper>
    );
  }
}

EditHeaderDialog.propTypes = propTypes;
EditHeaderDialog.defaultProps = defaultProps;

export default EditHeaderDialog;

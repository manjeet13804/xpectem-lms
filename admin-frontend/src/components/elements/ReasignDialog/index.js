import React, { PureComponent } from 'react';
import { bemlds } from 'utils';
import AdminSelect from 'containers/Uielements/AdminSelect';
import IntlMessages from 'components/utility/intlMessages';
import { PropTypes } from 'prop-types';
import ReasignDialogWrapper from './reasignDialog.style';

const defaultProps = {
  dialogId: null,
  reasignAdmin: null,
  closeModal: null,
  admins: [],
};

const propTypes = {
  dialogId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  reasignAdmin: PropTypes.func,
  closeModal: PropTypes.func,
  admins: PropTypes.arrayOf(PropTypes.object),
};


const b = bemlds('reasign-dialog');

class ReasignDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      adminId: null,
    };
  }

  saveAdminId = (id) => {
    this.setState({ adminId: id });
  };

  changeAdmin = () => {
    const { adminId } = this.state;
    const {
      reasignAdmin,
      dialogId,
      closeModal,
    } = this.props;

    reasignAdmin(dialogId, adminId);
    closeModal();
  };

  render() {
    const { admins } = this.props;
    const { adminId } = this.state;

    return (
      <ReasignDialogWrapper>
        <div className={b()}>
          <div className={b('title')}>
            <IntlMessages id="students.communicationTitleReasign" />
          </div>
          <div className={b('text')}>
            <IntlMessages id="students.communicationTextReasign" />
          </div>
          <div className={b('title-select')}>
            <IntlMessages id="students.communicationSelectTitle" />
          </div>
          <div className={b('select')}>
            <AdminSelect
              admins={admins}
              saveAdminId={this.saveAdminId}
            />
          </div>
          <div className={b('button')}>
            <button
              className={b('button-btn')}
              type="button"
              onClick={this.changeAdmin}
              disabled={!adminId}
            >
              <IntlMessages id="students.qaButtonSave" />
            </button>
          </div>
        </div>
      </ReasignDialogWrapper>
    );
  }
}

ReasignDialog.propTypes = propTypes;
ReasignDialog.defaultProps = defaultProps;

export default ReasignDialog;

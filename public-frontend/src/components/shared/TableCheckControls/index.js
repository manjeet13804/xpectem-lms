// @flow
import React, { PureComponent } from 'react';
import block from 'utils/bem';
import { btnIcon, sharedClass } from 'utils/className';
import { TERM_SHARED } from 'localise';
import {
  PopupContainer,
  MoreIcon,
  Checkbox,
} from 'components';

const bem = block('table-controls');

const DefaultProps = {
  checked: false,
  className: '',
  checkAll: () => {},
};

type StateType = {
  isPopupOpen: boolean
};

type PropsType = {
  checked?: boolean,
  className?: string,
  checkAll?: () => void,
  idCheckbox: string
};

class TableCheckControls extends PureComponent<PropsType, StateType> {
  constructor() {
    super();
    this.state = {
      isPopupOpen: false,
    };
  }

  openPopup = (): function => {
    this.setState({
      isPopupOpen: true,
    });
  }

  closePopup = (): function => {
    this.setState({
      isPopupOpen: false,
    });
  }

  render(): Node {
    const { isPopupOpen } = this.state;
    const {
      className,
      checkAll,
      checked,
      idCheckbox,
    } = this.props;
    const mainClass = sharedClass(bem, className);

    return (
      <section className={mainClass}>
        <Checkbox
          id={idCheckbox}
          bem={bem}
          handleChange={checkAll}
          text={TERM_SHARED.markAll}
          checked={checked}
        />
        <button
          type="button"
          className={btnIcon(bem)}
          onClick={this.openPopup}
        >
          <MoreIcon />
        </button>
        {
          isPopupOpen && <PopupContainer close={this.closePopup} />
        }
      </section>
    );
  }
}

TableCheckControls.defaultProps = DefaultProps;

export default TableCheckControls;

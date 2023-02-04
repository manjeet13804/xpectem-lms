// @flow
import React, {Node, Component} from 'react';
import block from 'utils/bem';
import { btnText, sharedClass } from 'utils/className';
import { TERM_SHARED } from 'localise';
import {
  PopupContainer,
  SearchField,
  ArrowIcon,
  Sort,
} from 'components';
import './table-caption.scss';

const bem = block('table-caption');

const DefaultProps = {
  className: '',
};

type StateType = {
  isPopupOpen: boolean
};

type PropsType = {
  optionsSort: Array,
  className?: string,
  isShow: boolean,
  isToggleBtn: boolean,
  togglerList: () => void
};

class TableCaption extends Component<PropsType, StateType> {
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
      togglerList,
      isShow,
      optionsSort,
      isToggleBtn,
    } = this.props;
    const mainClass = sharedClass(bem, className);
    const textBtn = isShow ? TERM_SHARED.hideOrganisations : TERM_SHARED.showOrganisations;

    return (
      <section className={mainClass}>
        {
          isToggleBtn && (
            <button
              className={btnText(bem)}
              type="button"
              onClick={togglerList}
            >
              <span className={bem('text')}>{textBtn}</span>
              <ArrowIcon className={bem('svg', {left: isShow})} />
            </button>
          )
        }
        <div className={bem('wrap')}>
          <Sort
            titleShow={false}
            options={optionsSort}
            classNamePrefix={bem()}
          />
          <SearchField />
        </div>
        {
          isPopupOpen && <PopupContainer close={this.closePopup} />
        }
      </section>
    );
  }
}

TableCaption.defaultProps = DefaultProps;

export default TableCaption;

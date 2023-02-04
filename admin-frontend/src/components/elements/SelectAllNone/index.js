import React, { Component } from 'react';
import { ArrowUp } from 'components';
import { bemlds } from 'utils';
import PropTypes from 'prop-types';
import SelectAllNoneWrapper from './selectAllNone.style';


const b = bemlds('select');

class SelectAllNone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueOption: '',
      openSelect: false,
    };
  }

  selectHandle = () => {
    this.setState({
      openSelect: !this.state.openSelect,
    });
  };

  selectValue = (value) => {
    this.setState({
      valueOption: value,
    });
  };

  render() {
    const { valueOption, openSelect } = this.state;
    const { onSelectAll, onSelectNone } = this.props;

    const arrValue = [
      {
        name: 'All', value: 1, select: false, action: onSelectAll,
      },
      {
        name: 'None', value: 2, select: false, action: onSelectNone,
      },
    ];
    return (
      <SelectAllNoneWrapper>
        <div
          role="button"
          tabIndex="0"
          className={b()}
          onClick={() => this.selectHandle()}
        >
          <div className={b('title')}>{valueOption}</div>
          <div className={b('icon')}>
            {openSelect
              ? (<ArrowUp />)
              : (<ArrowUp className={b('icon-down')} />)
            }
          </div>
        </div>
        <div className={b('block')}>
          {openSelect && arrValue.map(({ name, select, action }, index) => (
            <div
              key={name}
              className={b('item')}
              onClick={() => {
                this.selectValue(name);
                arrValue[index].select = true;
                action();
              }}
            >
              <div className={b('item-title')}>{name}</div>
            </div>
          ))}
        </div>
      </SelectAllNoneWrapper>
    );
  }
}

SelectAllNone.defaultProps = {
  onSelectAll: () => null,
  onSelectNone: () => null,
};

SelectAllNone.propTypes = {
  onSelectAll: PropTypes.func,
  onSelectNone: PropTypes.func,
};

export default SelectAllNone;

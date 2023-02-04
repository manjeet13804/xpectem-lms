import React, { Component } from 'react';
import { ArrowUp, CheckSelectSvg } from 'components';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds } from 'utils';
import SelectOfNumberWrapper from './selectOfNumber.style';

const number = [
  {name: '1', value: 1, select: true},
  {name: '2', value: 2, select: false},
  {name: '3', value: 3, select: false},
  {name: '4', value: 4, select: false},
  {name: '5', value: 5, select: false},
  {name: '6', value: 6, select: false},
  {name: '7', value: 7, select: false},
  {name: '8', value: 8, select: false},
  {name: '9', value: 9, select: false},
  {name: '10', value: 10, select: false},
];

const text = bemlds('text');
const b = bemlds('select');

class SelectOfNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSelect: false,
    };
  }

  selectHandle = () => {
    const { openSelect } = this.state;
    this.setState({
      openSelect: !openSelect,
    });
  };

  selectValue = (value) => {
    const { handleDataSave } = this.props;
    this.setState({
      valueOption: value,
    });
    this.selectHandle();
    handleDataSave(value);
  };

  render() {
    const { openSelect } = this.state;
    const { value } = this.props;

    return (
      <SelectOfNumberWrapper>
        <div className={text()}>
          <IntlMessages id="select.textTitle" />
        </div>
        <div
          role="button"
          tabIndex="0"
          className={b('', { 'close': !openSelect })}
          onClick={() => this.selectHandle()}
        >
          <div className={b('title')}>{value}</div>
          <div className={b('icon')}>
            {openSelect ?
              (<ArrowUp />)
              : (<ArrowUp className={b('icon-down')} />)
            }
          </div>
        </div>
        <div className={b('block', { 'hidden': !openSelect })}>
          {openSelect && number.map(({ name, select }, index) => (
              <div
                key={name}
                className={b('item')}
                onClick={() => {
                  this.selectValue(name);
                  number[index].select = true;
                }}
              >
                <div className={b('item-icon')}>
                  {(value === name) ? (<CheckSelectSvg />) : null}
                </div>
                <div className={b('item-title')}>{name}</div>
              </div>
            )
          )}
        </div>
      </SelectOfNumberWrapper>
    );
  }
}

export default SelectOfNumber;

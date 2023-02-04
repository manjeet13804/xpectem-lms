import React, { Component } from 'react';
import { bemlds } from 'utils';
import './styles.scss';

const b = bemlds('title-and-input');

class TitleAndInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxValue: '',
    };
  }

  onChange = (e) => {
    const { value } = e.target;
    const { name: nameBlock, handleChangeValue } = this.props;
    handleChangeValue(value, nameBlock);
  };

  render() {
    const {
      title = '',
      error= '',
      className = '',
      wrapperClassName = '',
      value,
      disabled = false,
      onBlur = () => null,
      onFocus = () => null,
      name,
    } = this.props;

    return (
      <section className={b({mix: wrapperClassName})}>
        <div className={b('content')}>
          {Boolean(title) && (
            <div className={b('title', { error: Boolean(error) })}>
              {title}
            </div>)}
          <input
            className={`${b('input', { error: Boolean(error) })} ${className}`}
            type="text"
            value={value}
            name={name}
            onChange={this.onChange}
            onBlur={onBlur}
            disabled={disabled}
            onFocus={onFocus}
          />
        </div>
        {error && (<p className={b('error')}>{error}</p>)}
      </section>
    );
  }
}

export default TitleAndInput;

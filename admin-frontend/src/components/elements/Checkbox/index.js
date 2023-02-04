import React, { Component } from 'react';
import { CheckSvg } from 'components';
import CheckboxWrapper from './checkbox.style';

const defaultProps = {
  handleCheck: () => null,
};

class Checkbox extends Component {
  toggleCheckbox = () => {
    const {
      handleCheck,
      name,
      setFieldValue,
      value,
      disabled,
    } = this.props;

    if (disabled) {
      return null;
    }
    handleCheck(!value, name, setFieldValue);
  };

  render() {
    const { title, value } = this.props;

    return (
      <CheckboxWrapper>
        <div
          className="checkbox-block"
          role="button"
          tabIndex="0"
          onClick={this.toggleCheckbox}
        >
          {value
            ? (
              <CheckSvg className="icon" id={title} />
            )
            : (
              <div
                id={title}
                className="clear-checkbox"
              />
            )
          }
          <label
            className="title"
            htmlFor={title}
          >
            {title}
          </label>
        </div>
      </CheckboxWrapper>
    );
  }
}


Checkbox.defaultProps = defaultProps;
export default Checkbox;

import React, { Component } from 'react';
import Input from '../uielements/input';
import { Icon, InputNumber } from 'antd';
import { validateInputLength, validateIllegalSymbols } from 'helpers/utility';

export default class extends Component {
  state = {
    value: this.props.value,
    editable: false,
    validationErrors: null,
  };

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    const { value: stateValue } = this.state;

    if (value !== stateValue) {
      this.setState({
        value,
      });
    }
  }

  handleChange = event => {
    const { validate } = this.props;

    const value = event && event.target ? event.target.value : event;
    if (validate) {
      this.validateField(value, validate.rools);
    }

    this.setState({ value });
  };

  check = () => {
    const { validationErrors } = this.state;

    if (validationErrors) return;

    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(
        this.state.value,
        this.props.columnsKey,
        this.props.index
      );
    }
  };

  onCancel = () => {
    const { value } = this.props;
    this.setState({ editable: false, value });
  };

  edit = () => this.setState({ editable: true });

  validateField = (value, rools) => {
    const { fieldName } = this.props;
    const max = (rools && rools.max) || 70;
    const min = (rools && rools.min) || 1;

    const validLength = validateInputLength({ value, name: fieldName, max, min });

    const validIllegalSymbol = validateIllegalSymbols(value);

    let errors = [];

    if (!validLength.valid) {
      errors.push(validLength.message);
    }

    if (!validIllegalSymbol) {
      errors.push(`${fieldName} contains illegal symbols`);
    }

    if (validLength.valid && validIllegalSymbol) {
      errors = null;
    }

    this.setState({
      ...this.state,
      validationErrors: errors,
    })
  }
  render() {
    const { value, editable, validationErrors } = this.state;
    const { isNumber } = this.props;

    let InputComponent = null;

    if (isNumber) {
      InputComponent = (
        <InputNumber
          value={value}
          onChange={this.handleChange}
          onPressEnter={this.check}
          className={validationErrors ? 'invalid editableCell' : 'editableCell'}
        />)
    } else {
      InputComponent = (
        <Input
          value={value}
          onChange={this.handleChange}
          onPressEnter={this.check}
          className={validationErrors ? 'invalid editableCell' : 'editableCell'}
        />)
    }

    const ErrorsMessage = () => {
      if (!validationErrors) {
        return
      }
      const errorList = validationErrors.map((error, index) => <li key={index}>{error}</li>)

      return (
        <ul className="editableCell-validation-error">
          {errorList}
        </ul>
      )
    }

    return (
      <div className="isoEditData">
        {editable ? (
          <React.Fragment>
            <div className="isoEditDataWrapper">
              {InputComponent}
              <Icon type="check" className="isoEditIcon" onClick={this.check} />
              <Icon type="close" className="isoDeleteIcon" onClick={this.onCancel} />
            </div>
            {ErrorsMessage()}
          </React.Fragment>
        ) : (
          <p className="isoDataWrapper">
            {value || ' '}
            <Icon type="edit" className="isoEditIcon" onClick={this.edit} />
          </p>
        )}
      </div>
    );
  }
}

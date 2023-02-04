import React, { Component } from 'react';
import { bemlds } from 'utils';
import PropTypes from 'prop-types';
import { AddSvg, CustomTextInput } from 'components';
import { Icon } from 'semantic-ui-react';

import AddInputWrapper from './addedInput.style';

const propTypes = {
  handleChange: PropTypes.func,
  valueFirstInput: PropTypes.string,
  nameSecondInput: PropTypes.string,
  unSetError: PropTypes.func,
  title: PropTypes.string,
  addTitle: PropTypes.string,
  placeholder: PropTypes.string,
  valueSecondInput: PropTypes.string,
  errorFirstInput: PropTypes.string,
  nameFirstInput: PropTypes.string,
  errorSecondInput: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  isSingleInputChange: PropTypes.bool,
};

const defaultProps = {
  handleChange: () => null,
  valueFirstInput: '',
  nameSecondInput: '',
  unSetError: () => null,
  title: '',
  addTitle: '',
  placeholder: '',
  valueSecondInput: '',
  errorFirstInput: '',
  nameFirstInput: '',
  errorSecondInput: '',
  onFocus: () => null,
  onBlur: () => null,
  isSingleInputChange: false,
};

const b = bemlds('add-input');

class AddInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstValue: '',
      secondValue: '',
      clickAdd: false,
      firstError: false,
      secondError: false,
    };
  }

  clickAddHandle = () => {
    this.setState({ clickAdd: true });
  };

  removeSecondInput = () => {
    const {
      handleChange,
      nameSecondInput,
      unSetError,
    } = this.props;
    this.setState({ clickAdd: false });
    unSetError({
      [nameSecondInput]: '',
    });
    handleChange({ target: { name: nameSecondInput, value: '' } });
  }

  handleChangeByForm = ({ target: { name, value } }) => {
    const { handleChange } = this.props;
    handleChange({ target: { name, value } });
  }

  render() {
    const { clickAdd } = this.state;

    const {
      title,
      addTitle,
      placeholder,
      valueFirstInput,
      valueSecondInput,
      errorFirstInput,
      nameFirstInput,
      errorSecondInput,
      nameSecondInput,
      onFocus,
      onBlur,
    } = this.props;

    const isSecondInput = clickAdd || valueSecondInput;

    return (
      <AddInputWrapper>
        <section className={b()}>
          <div className={b('title')}>
            {title}
          </div>
          <CustomTextInput
            className={b('input').toString()}
            type="text"
            name={nameFirstInput}
            value={valueFirstInput}
            placeholder={placeholder}
            onChange={e => this.handleChangeByForm(e, true)}
            onFocus={onFocus}
            error={errorFirstInput}
            onBlur={onBlur}
          />
          {!isSecondInput && (
          <div
            className={b('add')}
            role="button"
            tabIndex="0"
            onClick={this.clickAddHandle}
          >
            <AddSvg />
            <div className={b('add-title')}>
              {addTitle}
            </div>
          </div>
          )}
          {isSecondInput && (
            <div className={b('input-wrapper')}>
              <CustomTextInput
                className={b('input').toString()}
                type="text"
                value={valueSecondInput}
                placeholder={placeholder}
                onChange={e => this.handleChangeByForm(e)}
                name={nameSecondInput}
                onFocus={onFocus}
                error={errorSecondInput}
                onBlur={onBlur}
              />
              <button
                type="button"
                className={b('remove-btn')}
                onClick={this.removeSecondInput}
              >
                <Icon name="close" />
              </button>
            </div>
          )}
        </section>
      </AddInputWrapper>
    );
  }
}

AddInput.defaultProps = defaultProps;
AddInput.propTypes = propTypes;
export default AddInput;

import React, { Component } from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';
import { stringToBool, parseBool } from 'helpers/utility';
import Select, {
  SelectOption as Option,
} from 'components/uielements/select';
import PropTypes from 'prop-types';

class SelectCell extends Component {
  constructor(props) {
    super();

    this.state = {
      value: props.value,
      editable: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { value: propValue } = this.props;
    const { value: stateValue } = this.state;

    if (prevProps.value !== propValue && propValue !== stateValue) {
      this.onSetState({ ...this.state, value: propValue });
    }
  }

  onSetState(state) {
    this.setState(state);
  }

  handleChange = (value) => {
    this.setState({
      value: parseBool(value),
    });
  };

  check = () => {
    const { columnsKey, index, onChange } = this.props;
    const { value } = this.state;
    this.setState({ editable: false });

    if (onChange) {
      onChange(
        value,
        columnsKey,
        index,
      );
    }
  };

  onCancel = () => {
    this.setState({ editable: false });
  };

  edit = () => {
    this.setState({ editable: true });
  };

  renderOptions = () => {
    const { data } = this.props;

    return data.map(value => (
      <Option style={{ textOverflow: 'initial' }} key={value.text} value={String(value.value)}>
        {value.text}
      </Option>
    ));
  };

  renderSelect = () => {
    const { value } = this.state;

    return (
      <div className="isoEditDataWrapper">
        <Select value={String(value)} onChange={this.handleChange} dropdownMatchSelectWidth={false}>
          {this.renderOptions()}
        </Select>
        <Icon type="check" className="isoEditIcon" onClick={this.check} />
        <Icon type="close" className="isoDeleteIcon" onClick={this.onCancel} />
      </div>
    );
  };

  renderValue = () => {
    const {
      data,
      useBoolView,
      value,
      disabled,
      isDisplayOnly,
    } = this.props;

    const mappedValue = !useBoolView ? (data.find(item => item.value === value).text || value) : ' ';
    const boolValue = stringToBool(value);
    const lightClass = useBoolView ? classNames({
      isAvailable: boolValue,
      isNotAvailable: !boolValue,
    }) : '';

    return (
      useBoolView ? (
        <div className="statusRow">
          <span className={`isoLabelIndicatorColor ${lightClass}`} />
          {!disabled && !isDisplayOnly && <Icon type="edit" className="isoEditIcon" onClick={this.edit} />}
        </div>
      ) : (
        <p className="isoDataWrapper">
          { mappedValue }
          <Icon type="edit" className="isoEditIcon" onClick={this.edit} />
        </p>
      )
    );
  };

  render() {
    const { editable } = this.state;
    const { isDisplayOnly } = this.props;

    return (
      <div className="isoEditData">
        {editable && !isDisplayOnly ? (
          this.renderSelect()
        ) : (
          this.renderValue()
        )}
      </div>
    );
  }
}

SelectCell.defaultProps = {
  value: null,
  useBoolView: null,
  disabled: false,
  isDisplayOnly: false,
};

SelectCell.propTypes = {
  value: PropTypes.any,
  data: PropTypes.any.isRequired,
  columnsKey: PropTypes.any.isRequired,
  index: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  useBoolView: PropTypes.any,
  disabled: PropTypes.bool,
  isDisplayOnly: PropTypes.bool,
};

export default SelectCell;

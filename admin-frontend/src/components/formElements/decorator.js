import React, { Component } from 'react';
import classNames from 'classnames';
import Form from 'components/uielements/form';
import { getInputConfig } from 'helpers/utility';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

function inputWrap(type) {
  return class Wrap extends Component {
    static defaultProps = {
      title: '',
      itemName: '',
      itemClass: '',
      getFieldDecorator: null,
      onlyPlaceholder: false,
      error: null,
    };

    static propTypes = {
      title: PropTypes.string,
      itemName: PropTypes.string,
      getFieldDecorator: PropTypes.func,
      onlyPlaceholder: PropTypes.bool,
      itemClass: PropTypes.string,
      error: PropTypes.string,
      input: PropTypes.shape({}).isRequired,
    };

    render() {
      const {
        itemName,
        getFieldDecorator,
        onlyPlaceholder,
        itemClass,
        input,
        error,
        title,
      } = this.props;

      const style = classNames({
        [itemClass]: itemClass,
        wideContent: true,
      });

      const errorProps = error
        ? { validateStatus: 'error', help: error }
        : null;

      return (
        <FormItem
          label={!onlyPlaceholder && title}
          className={style}
          {...errorProps}
        >
          { getFieldDecorator
            ? getFieldDecorator(itemName, getInputConfig(this.props, type))(input)
            : input
          }
        </FormItem>
      );
    }
  };
}

export {inputWrap};

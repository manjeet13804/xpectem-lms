// @flow
import React, { PureComponent, Node } from 'react';
import block from 'utils/bem';
import { sharedClass } from 'utils/className';
import Select from 'react-select';

import { TERM_SHARED } from 'localise';
import './sort.scss';

const bem = block('sort');

const DefaultProps = {
  classNamePrefix: '',
  titleShow: true,
};

type PropType = {
  classNamePrefix?: string,
  titleShow?: boolean,
  options: Array
};

type StateType = {
  selectedOption: string
};

class Sort extends PureComponent<PropType, StateType> {
  constructor(props: PropType) {
    super(props);
    this.state = {
      selectedOption: props.options[0],
    };
  }

  handleChange = (selectedOption: string) => {
    this.setState({ selectedOption });
  }

  bemParent = (): function => {
    const { classNamePrefix } = this.props;
    return classNamePrefix ? block(classNamePrefix) : () => {};
  }

  render(): Node {
    const { selectedOption } = this.state;
    const { titleShow, options } = this.props;
    const addClassParent = this.bemParent();
    const mainClass = sharedClass(bem(), addClassParent('sort'));
    const textClass = sharedClass(bem('text'), addClassParent('text'));
    return (
      <section className={mainClass}>
        {
          titleShow && <span className={textClass}>{TERM_SHARED.sort}</span>
        }
        <Select
          options={options}
          onChange={this.handleChange}
          value={selectedOption}
          classNamePrefix={`${bem()}`}
        />
      </section>
    );
  }
}

Sort.defaultProps = DefaultProps;

export default Sort;

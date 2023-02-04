// @flow
import React from 'react';
import { components } from 'react-select';
import {ShapeSelect} from 'components';

import './custom-arrow.scss';

export default (props: object): object => (
  components.DropdownIndicator && (
  <components.DropdownIndicator {...props}>
    {props.selectProps.menuIsOpen ? <ShapeSelect className="selector-shape" /> : <ShapeSelect />}
  </components.DropdownIndicator>
  )
);

// @flow
import React, { Node } from 'react';
import classNames from 'classnames/bind';
import block from 'utils/bem';
import { btnText, sharedClass } from 'utils/className';
import { TERM_SHARED } from 'localise';
import {
  SearchField,
} from 'components';

const bem = block('table-controls');

const DefaultProps = {
  className: '',
};

type PropsType = {
  className?: string,
  clickHandler: () => void
};

const TableSearchControls = (props: PropsType): Node => {
  const { className, clickHandler} = props;
  const mainClass = sharedClass(bem, className);
  const btnClass = classNames([btnText(bem), 'btn--plus']);

  return (
    <section className={mainClass}>
      <button
        className={btnClass}
        type="button"
        onClick={clickHandler}
      >
        <span>{TERM_SHARED.addGroup}</span>
      </button>
      <SearchField />
    </section>
  );
};

TableSearchControls.defaultProps = DefaultProps;

export default TableSearchControls;

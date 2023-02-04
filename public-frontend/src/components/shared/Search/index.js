// @flow
import React, { PureComponent, Node, SynteticEvent } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import block from 'utils/bem';
import classNames from 'classnames/bind';
import { btnIcon } from 'utils/className';
import {
  SearchIcon,
  WarningIcon,
} from 'components';
import { ERRORS } from 'localise';
import './search.scss';

const bem = block('search');

const searchSchema = Yup.object().shape({
  search: Yup.string()
    .required(ERRORS.fieldSholdFilled),
});

type PropType = {
  classNamePrefix: string
};

type StateType = {
  isInputShow: boolean
};

class SearchField extends PureComponent<PropType, StateType> {
  constructor() {
    super();
    this.state = {
      isInputShow: false,
    };
    this.SHOW = {
      show: true,
      hide: false,
    };
  }

  onFormSubmit = (values: object) => {
    console.log('SUBMIT', values);
    this.toggleShowInput(this.SHOW.hide);
  }

  toggleShowInput = (value: boolean) => {
    this.setState({
      isInputShow: value,
    });
  }

  bemParent = (): function => {
    const { classNamePrefix } = this.props;
    return classNamePrefix ? block(classNamePrefix) : () => {};
  }

  renderBtn = (): Node => {
    const { isInputShow } = this.state;
    const cklickHandler = isInputShow
      ? this.onSubmit
      : (e: SynteticEvent) => {
        e.preventDefault();
        this.toggleShowInput(this.SHOW.show);
      };
    const propsBtn = {
      onClick: cklickHandler,
      className: btnIcon(bem),
    };
    const btn = isInputShow
      ? <button type="submit" {...propsBtn}><SearchIcon fill="#959595" /></button>
      : <button type="button" {...propsBtn}><SearchIcon fill="#959595" /></button>;
    return btn;
  }

  renderInput = (props: object): Node => {
    const { isInputShow } = this.state;
    if (!isInputShow) return null;
    const hasError = props.errors.search && props.touched.search;
    const inputClass = classNames({
      [`${bem('input')}`]: true,
      [`${bem('input--error')}`]: hasError,
      input: true,
    });

    return (
      <label className={bem('label')} htmlFor="search">
        <input
          className={inputClass}
          type="text"
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.values.search}
          name="search"
          id="search"
        />
        { hasError ? (
          <p className={bem('error')}>
            {props.errors.search}
            <WarningIcon
              fill="#f44d41"
            />
          </p>
        ) : null}
      </label>
    );
  }

  render(): Node {
    const addClassParent = this.bemParent();
    const formClass = classNames([
      `${bem()}`,
      `${addClassParent('search')}`,
    ]);
    return (
      <Formik
        initialValues={{ search: '' }}
        validationSchema={searchSchema}
        onSubmit={(values: object, actions: object) => {
          actions.resetForm();
          this.onFormSubmit(values);
        }}
        render={(props: object): Node => (
          <form
            onSubmit={props.handleSubmit}
            className={formClass}
          >
            { this.renderInput(props)}
            {this.renderBtn()}
          </form>
        )}
      />
    );
  }
}

export default SearchField;

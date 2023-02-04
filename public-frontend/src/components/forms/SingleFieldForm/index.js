// @flow
import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {InputField} from 'components';

import {sharedClass} from 'utils/className';
import block from 'utils/bem';
import {ERRORS, TERM_SHARED} from 'localise';

import './single-field-form.scss';

const DefaultProps = {
  inputDefault: '',
};

type PropType = {
  titleInput: string,
  buttonText: string,
  onSubmit: (values: object, options: object) => void,
  close: () => void,
  isLoading: boolean,
  placeholder: string,
  inputDefault?: string
};

const bem = block('single-field-form');
const btn = block('btn');

const schema = Yup.object().shape({
  field: Yup.string()
    .max(50, ERRORS.maxCharacters(50))
    .min(3, ERRORS.minCharacters(3))
    .required(ERRORS.required),
});

const form = sharedClass('form', bem());
const btnCancel = sharedClass(btn({cancel: true}), bem('btn-cancel'));
const btnSubmit = sharedClass(bem('submit'), 'btn');

const SingleFieldForm = (props: PropType): Node => {
  const {
    close,
    isLoading,
    buttonText,
    titleInput,
    onSubmit,
    placeholder,
    inputDefault,
  } = props;
  return (
    <Formik
      initialValues={{field: inputDefault}}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
      }: object): Node => (
        <form className={form} onSubmit={handleSubmit}>
          <section className={bem('content')}>
            <InputField
              title={titleInput}
              id="field"
              value={values.field}
              onBlur={handleBlur}
              onChange={handleChange}
              error={errors.field && touched.field}
              errorMessage={errors.field}
              placeholder={placeholder}
              type="text"
              required
            />
          </section>
          <hr className="line" />
          <section className={bem('buttons')}>
            <button type="button" className={btnCancel} onClick={close}>
              {TERM_SHARED.abort}
            </button>
            <button
              type="submit"
              className={btnSubmit}
              disabled={isSubmitting || !isValid || isLoading}
            >
              {buttonText}
            </button>
          </section>
        </form>
      )}
    </Formik>

  );
};

SingleFieldForm.defaultProps = DefaultProps;

export default SingleFieldForm;

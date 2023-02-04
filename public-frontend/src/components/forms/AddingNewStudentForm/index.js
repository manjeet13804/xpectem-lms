// @flow
import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {InputField} from 'components';

import {sharedClass} from 'utils/className';
import block from 'utils/bem';
import {TERM_SHARED, FORMS} from 'localise';
import {
  telephone,
  email,
  firstName,
  lastName,
  organisation,
  streetAddress,
} from '../validate';

import './adding-new-student-form.scss';

type PropType = {
    onSubmit: (values: object, options: object) => void,
    close: () => void,
    isLoading: boolean
};

const bem = block('adding-new-student-form');
const btn = block('btn');

const schema = Yup.object().shape({
  organisation,
  email,
  firstName,
  lastName,
  telephone,
  streetAddress,
});

const form = sharedClass('form', bem());
const btnCancel = sharedClass(btn({cancel: true}), bem('btn-cancel'));
const btnSubmit = sharedClass(bem('submit'), 'btn');

const AddingNewStudentForm = (props: PropType): Node => {
  const {
    close,
    isLoading,
    onSubmit,
  } = props;
  return (
    <Formik
      initialValues={{
        organisation: '',
        streetAddress: '',
        postalCode: '',
        postalAddress: '',
        email: '',
        telephone: '',
      }}
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
              title={TERM_SHARED.organisation}
              id="organisation"
              value={values.organisation}
              onBlur={handleBlur}
              onChange={handleChange}
              error={errors.organisation && touched.organisation}
              errorMessage={errors.organisation}
              placeholder={FORMS.placeholderAddOrganisation}
              type="text"
            />
            <div className={bem('field-row')}>
              <InputField
                title={TERM_SHARED.firstName}
                id="firstName"
                value={values.firstName}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.firstName && touched.firstName}
                errorMessage={errors.firstName}
                placeholder={FORMS.placeholderFirstName}
                type="text"
                required
              />
              <InputField
                title={TERM_SHARED.lastName}
                id="lastName"
                value={values.lastName}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.lastName && touched.lastName}
                errorMessage={errors.lastName}
                placeholder={FORMS.placeholderLastName}
                type="text"
                required
              />
            </div>
            <InputField
              title={TERM_SHARED.streetAddress}
              id="streetAddress"
              value={values.streetAddress}
              onBlur={handleBlur}
              onChange={handleChange}
              error={errors.streetAddress && touched.streetAddress}
              errorMessage={errors.streetAddress}
              type="text"
            />
            <div className={bem('field-row')}>
              <InputField
                title={TERM_SHARED.postalAddress}
                id="postalAddress"
                value={values.postalAddress}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.postalAddress && touched.postalAddress}
                errorMessage={errors.postalAddress}
                type="text"
              />
              <InputField
                title={TERM_SHARED.postalCode}
                id="postalCode"
                value={values.postalCode}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.postalCode && touched.postalCode}
                errorMessage={errors.postalCode}
                type="text"
              />
            </div>
            <InputField
              title={TERM_SHARED.emailAddress}
              id="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              error={errors.email && touched.email}
              errorMessage={errors.email}
              placeholder={FORMS.placeholderEmail}
              type="text"
              required
            />
            <InputField
              title={TERM_SHARED.telephone}
              id="telephone"
              value={values.telephone}
              onBlur={handleBlur}
              onChange={handleChange}
              error={errors.telephone && touched.telephone}
              errorMessage={errors.telephone}
              type="text"
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
              {TERM_SHARED.add}
            </button>
          </section>
        </form>
      )}
    </Formik>

  );
};


export default AddingNewStudentForm;

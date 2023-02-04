// @flow
import React, {Component, SynteticEvent} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import block from 'utils/bem';
import {sharedClass} from 'utils/className';

import {
  FORMS,
  ROLES,
  TERM_SHARED,
} from 'localise';

import {
  Select,
  HelpIcon,
  InputField,
  InputHint,
  Checkbox,
} from 'components';

import {email, telephone} from '../validate';

import './adding-existing-admin-form.scss';
import '../form.scss';

const DefaultProps = {
  isLoading: false,
  hints: [],
};

type PropType = {
  close: () => void,
  isLoading?: boolean,
  handleSubmit: (values: object, options: object) => void,
  selectOptions: Array<object>,
  hints?: Array<object>,
  closeHint: () => void,
  handleChangeField: (e: SynteticEvent) => void,
  showHint: boolean
};

const bem = block('form-added-admin');
const adminBlock = block('added-existing-admin-form');
const btn = block('btn');
const form = block('form');
const buttons = sharedClass(form('buttons'), bem('buttons'));
const btnSubmit = sharedClass(form('submit'), 'btn', bem('button'));
const btnCancel = sharedClass(btn({cancel: true}), bem('btn-cancel'), bem('button'));

const rolesData = [
  {role: ROLES.editor, id: 'editor'},
  {role: ROLES.tutor, id: 'tutor'},
  {role: ROLES.administrator, id: 'admin'},
  {role: ROLES.superAdministrator, id: 'sadmin'},
];

const schema = Yup.object().shape({
  username: email,
  telephone,
});

class AddingAdminForm extends Component<PropType> {
  constructor(props: PropType) {
    super(props);

    this.state = {
      group: '',
      editor: false,
      tutor: false,
      admin: false,
      sadmin: false,
    };
  }

  handleChangeSelect = (group: mixed): mixed => {
    this.setState({group});
  };

  handleCheckbox = ({value, id}: object) => {
    this.setState({[id]: value});
  };

  showHints = (setValues: object, values: object): Node => {
    const {hints, closeHint} = this.props;
    if (!hints.length) return null;
    return (
      <InputHint close={closeHint} className={bem('hints')}>
        {hints.map((user: object): Node => (
          <div
            key={user.email}
            id={user.email}
            onMouseDown={(e: SynteticEvent) => {
              setValues({
                ...values,
                username: e.target.id,
              });
              closeHint();
            }}
            role="button"
            tabIndex="0"
          >
            <p id={user.email} className={adminBlock('username')}>
              {`${user.firstName} ${user.lastName}`}
            </p>
            <p id={user.email} className={adminBlock('email')}>
              {user.email}
            </p>
          </div>
        ))}
      </InputHint>
    );
  };

  form = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isSubmitting,
    isValid,
    setValues,
  }: object): Node => {
    const {
      close,
      handleSubmit,
      selectOptions,
      isLoading,
      handleChangeField,
      showHint,
    } = this.props;

    const {
      group,
    } = this.state;

    return (
      <form className={`form ${bem()}`} onSubmit={handleSubmit}>
        <p className={bem('title')}>{FORMS.addedAdmin}</p>
        <section className={bem('content')}>
          <div className={bem('field')}>
            <HelpIcon className={bem('help-icon')} />
            <InputField
              title={TERM_SHARED.email}
              id="username"
              value={values.username}
              onChange={(e: SynteticEvent) => {
                handleChangeField(e);
                handleChange(e);
              }}
              placeholder={FORMS.placeholderSearch}
              onBlur={handleBlur}
              error={touched.username && errors.username}
              errorMessage={errors.username}
              required
            />
          </div>
          {showHint && this.showHints(setValues, values)}
          <div className={bem('field')}>
            <HelpIcon className={bem('help-icon')} />
            <InputField
              title={TERM_SHARED.telephone}
              id="telephone"
              value={values.telephone}
              onChange={handleChange}
              placeholder={FORMS.placeholderTelephone}
              error={touched.telephone && errors.telephone}
              errorMessage={errors.telephone}
              onBlur={handleBlur}
            />
          </div>
          <div className={bem('field')}>
            <HelpIcon className={bem('help-icon')} />
            <div className={bem('field-selector')}>
              <div className={bem('title-selector')}>
                <p className={bem('text')}>{TERM_SHARED.group}</p>
                <p className={bem('optional')}>{` - ${TERM_SHARED.optional}`}</p>
              </div>
              <Select
                handleChange={this.handleChangeSelect}
                options={selectOptions}
                selectedOption={group}
                styles={bem('selector')}
                placeholder={FORMS.placeholderGroup}
                isMulti
              />
            </div>
          </div>
          <section className={bem('roles')}>
            <p className={bem('text', {subtitle: true})}>{FORMS.selectAdminRole}</p>
            {rolesData.map((item: object): Node => {
              const {[item.id]: id} = this.state;
              return (
                <div className={bem('field-roles')} key={item.id}>
                  <HelpIcon className={bem('help-icon')} />
                  <Checkbox
                    id={item.id}
                    handleChange={this.handleCheckbox}
                    checked={id}
                    bem={bem}
                    text={item.role}
                  />
                </div>
              );
            })}
          </section>
        </section>
        <hr className="line" />
        <section className={buttons}>
          <button
            type="button"
            className={btnCancel}
            onClick={close}
          >
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
    );
  };

  render(): Node {
    const {
      handleSubmit,
    } = this.props;

    const {
      group,
      editor,
      admin,
      sadmin,
      tutor,
    } = this.state;

    return (
      <Formik
        initialValues={{
          username: '',
          telephone: '',
          group: '',
        }}
        validationSchema={schema}
        validate={this.nameAndMailMatch}
        onSubmit={(values: object) => {
          handleSubmit(values, {
            editor,
            admin,
            sadmin,
            tutor,
            group,
          });
        }}
      >
        {(tools: object): Node => (
          this.form(tools)
        )}
      </Formik>
    );
  }
}

AddingAdminForm.defaultProps = DefaultProps;

export default AddingAdminForm;

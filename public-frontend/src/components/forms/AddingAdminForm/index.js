// @flow
import React, {Component} from 'react';
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
  RadioButton,
} from 'components';

import {
  telephone,
  email,
  firstName,
  lastName,
} from '../validate';
import '../form.scss';

const DefaultProps = {
  isLoading: false,
};

type PropType = {
  close: () => void,
  isLoading?: boolean,
  handleSubmit: (values: object, options: object) => void,
  selectOptions: Array<object>
};

const bem = block('form-added-admin');
const btn = block('btn');
const form = block('form');
const btnSubmit = sharedClass(form('submit'), 'btn', bem('button'));
const btnCancel = sharedClass(btn({cancel: true}), bem('btn-cancel'), bem('button'));
const buttons = sharedClass(form('buttons'), bem('buttons'));

const rolesData = [
  {role: ROLES.editor, id: 'editor'},
  {role: ROLES.tutor, id: 'tutor'},
  {role: ROLES.administrator, id: 'admin'},
  {role: ROLES.superAdministrator, id: 'super_admin'},
];

const schema = Yup.object().shape({
  email,
  firstName,
  lastName,
  telephone,
});

class AddingAdminForm extends Component<PropType> {
  constructor(props: PropType) {
    super(props);

    this.state = {
      groups: [],
      role: null,
    };
  }

  handleChangeSelect = (groups: mixed): mixed => {
    this.setState({groups});
  };

  handleCheckbox = (id: number | string) => {
    this.setState({role: id});
  };

   form = ({
     values,
     errors,
     touched,
     handleChange,
     handleBlur,
     handleSubmit,
     isSubmitting,
     isValid,
   }: object): Node => {
     const {
       close,
       selectOptions,
       isLoading,
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
               title={TERM_SHARED.firstName}
               id="firstName"
               value={values.firstName}
               onChange={handleChange}
               placeholder={FORMS.placeholderFirstName}
               onBlur={handleBlur}
               error={touched.firstName && errors.firstName}
               errorMessage={errors.firstName}
               required
             />
           </div>
           <div className={bem('field')}>
             <HelpIcon className={bem('help-icon')} />
             <InputField
               title={TERM_SHARED.lastName}
               id="lastName"
               value={values.lastName}
               onChange={handleChange}
               placeholder={FORMS.placeholderLastName}
               onBlur={handleBlur}
               error={touched.lastName && errors.lastName}
               errorMessage={errors.lastName}
               required
             />
           </div>
           <div className={bem('field')}>
             <HelpIcon className={bem('help-icon')} />
             <InputField
               title={TERM_SHARED.emailAddress}
               id="email"
               value={values.email}
               onChange={handleChange}
               placeholder={FORMS.placeholderEmail}
               onBlur={handleBlur}
               error={touched.email && errors.email}
               errorMessage={errors.email}
               required
             />
           </div>
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
             {rolesData.map((item: object): Node => (
               <div className={bem('field-roles')} key={item.id}>
                 <HelpIcon className={bem('help-icon')} />
                 <RadioButton
                   id={item.id}
                   handleChange={this.handleCheckbox}
                   bem={bem}
                   text={item.role}
                 />
               </div>
             ))}
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
       role,
       groups,
     } = this.state;

     return (
       <Formik
         initialValues={{
           firstName: '',
           lastName: '',
           email: '',
           telephone: '',
         }}
         validationSchema={schema}
         validate={this.nameAndMailMatch}
         onSubmit={(values: object, {setSubmitting}: object) => {
           setSubmitting(false);
           handleSubmit({...values, roles: role, groups});
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

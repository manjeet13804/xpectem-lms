import React, { Component } from 'react';
import {
  ArrowUp,
  SelectAnyTime,
  Checkbox,
  AddInput,
  CustomTextInput,
} from 'components';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import IntlMessages from 'components/utility/intlMessages';
import { PLACEHOLDER } from 'constants/constants';
import { bemlds, returnNumberOfLang } from 'utils';
import { STUDENT_SCHEMA } from '../../../constants/validationShema/index';
import StudentProfileWrapper from './studentProfile.style';

const {
  firstNameTitle,
  lastNameTitle,
  emailTitle,
  telephoneTitle,
  streetAddressPlaceholder,
  enterNote,
} = PLACEHOLDER;

const b = bemlds('student-profile');
const form = bemlds('form');


class StudentProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      firstName: '',
      lastName: '',
      firstEmail: '',
      secondEmail: '',
      firstPhone: '',
      secondPhone: '',
      notifyEmail: false,
      notifySms: false,
      language: '',
      streetAddress: '',
      note: '',
      studentTaxonomies: [],
      errors: {
        firstName: '',
        lastName: '',
        firstEmail: '',
        secondEmail: '',
        firstPhone: '',
        secondPhone: '',
        personNumber: '',
        employeeNumber: '',
        streetAddress: '',
      },
    };
  }

  unSetError = (errorsStatement) => {
    const { errors } = this.state;
    const { addErrorStatusToStudent, indexStudent } = this.props;
    const newErrors = {
      ...errors,
      ...errorsStatement,
    };
    this.setState({
      errors: newErrors,
    });
    const isErrors = Boolean(Object.values(newErrors).filter(item => item).length);
    addErrorStatusToStudent(isErrors, indexStudent);
  }

  validationAction = (name, value) => {
    const { errors } = this.state;
    const { addErrorStatusToStudent, indexStudent } = this.props;
    STUDENT_SCHEMA.validateAt(name, { [name]: value })
      .then(() => {
        const newErrors = {
          ...errors,
          [name]: '',
        };
        this.setState({
          errors: newErrors,
        });
        const isErrors = Boolean(Object.values(newErrors).filter(item => item).length);
        addErrorStatusToStudent(isErrors, indexStudent);
      })
      .catch((e) => {
        const newErrors = {
          ...errors,
          [name]: e.message,
        };
        this.setState({
          errors: newErrors,
        });
        const isErrors = Boolean(Object.values(newErrors).filter(item => item).length);
        addErrorStatusToStudent(isErrors, indexStudent);
      });
  }

  handleBlurValidationStreetAddress = ({ target: { name, value } }) => {
    const { errors } = this.state;
    this.setState({
      errors: {
        ...errors,
        [name]: value ? '' : 'Field is required',
      },
    });
  }

  onBlurValidation = ({ target: { name, value } }) => {
    const { addErrorStatusToStudent, indexStudent } = this.props;
    const { errors } = this.state;

    if ((name === 'firstPhone'
      || name === 'secondPhone'
      || name === 'employeeNumber') && !value) {
      const newErrors = {
        ...errors,
        [name]: '',
      };
      this.setState({
        errors: newErrors,
      });
      const isErrors = Object.values(newErrors).some(Boolean);
      addErrorStatusToStudent(isErrors, indexStudent);
    } else {
      this.validationAction(name, value);
    }
  }

  clickStudentBlock = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };

  handleChange = ({
    target: {
      value,
      name,
    },
  }) => {
    this.setState({ [name]: value });
    const { changeCheckbox, indexStudent } = this.props;
    changeCheckbox(value, name, indexStudent);
  };

  handleCheck = (value, name) => {
    this.setState({ [name]: value });
    const { changeCheckbox, indexStudent } = this.props;
    changeCheckbox(value, name, indexStudent);
  };

  handleLangSave = (value) => {
    this.setState({ language: returnNumberOfLang(value) });
    const { addInputLang, indexStudent } = this.props;

    addInputLang(returnNumberOfLang(value), indexStudent);
  };

  addFirstName = ({ target: { value } }) => {
    this.setState({ firstName: value });
    const { addInputFirstName, indexStudent } = this.props;
    this.unsetUnfilledField('firstName');
    addInputFirstName(value, indexStudent);
  };

  handleChangeAddressStreet = ({ target: { value } }) => {
    const { handleChangeAddress, indexStudent } = this.props;
    this.setState({
      streetAddress: value,
    });
    this.unsetUnfilledField('streetAddress');
    handleChangeAddress(value, indexStudent);
  }

  addLastName = ({ target: { value } }) => {
    this.setState({ lastName: value });
    const { addInputLastName, indexStudent } = this.props;
    this.unsetUnfilledField('lastName');
    addInputLastName(value, indexStudent);
  };

  addTaxonomyData = (value, id) => {
    const { studentTaxonomies } = this.state;
    const { changeTaxonomyData, indexStudent } = this.props;
    const taxonomyExist = studentTaxonomies.some(item => item.taxonomy.id === id);
    if (taxonomyExist) {
      if (value === '') {
        const changedTaxonomy = studentTaxonomies.filter(item => item.taxonomy.id.toString() !== id.toString());
        this.setState({ studentTaxonomies: [...changedTaxonomy] });
        changeTaxonomyData(changedTaxonomy, indexStudent);
        return;
      }
      const changedTaxonomy = studentTaxonomies.map((item) => {
        if (item.taxonomy.id.toString() === id.toString()) return { ...item, value };
        return item;
      });
      this.setState({ studentTaxonomies: [...changedTaxonomy] });
      changeTaxonomyData(changedTaxonomy, indexStudent);
      return;
    }
    const changedTaxonomy = [...studentTaxonomies, { taxonomy: { id }, value }];
    this.setState({ studentTaxonomies: changedTaxonomy });
    changeTaxonomyData(changedTaxonomy, indexStudent);
  };

  handleAddInput = (name, value1, value2) => {
    const { addInputEmail, addInputPhone, indexStudent } = this.props;
    const resultValue2 = value2 || '';
    switch (name) {
      case 'email':
        this.setState({ firstEmail: value1, secondEmail: resultValue2 });
        addInputEmail(value1, resultValue2, indexStudent);
        break;
      case 'phone':
        this.setState({ firstPhone: value1, secondPhone: resultValue2 });
        addInputPhone(value1, resultValue2, indexStudent);
        break;

      default:
        return null;
    }
  };

  handleChangeEmails = ({ target: { name, value } }) => {
    const { addInputEmail, indexStudent } = this.props;
    this.setState({
      [name]: value,
    });
    this.unsetUnfilledField('firstEmail');
    addInputEmail(name, value, indexStudent);
  }

  handleChangePhones = ({ target: { name, value } }) => {
    const { addInputPhone, indexStudent } = this.props;
    this.setState({
      [name]: value,
    });
    addInputPhone(name, value, indexStudent);
  }

  checkForUnfilledField = (field) => {
    const { currentStudents, indexStudent } = this.props;
    const currentStudent = currentStudents.find((item, i) => i === indexStudent) || {};
    const { unfilledFields } = currentStudent;
    const arrayForCheck = unfilledFields || [];
    return arrayForCheck.find(item => item === field) ? 'This field is required' : '';
  }

  unsetUnfilledField = (name) => {
    const { addUnfilledFields, currentStudents, indexStudent } = this.props;
    const currentStudent = currentStudents.find((item, i) => i === indexStudent) || {};
    const { unfilledFields } = currentStudent;
    const arrayForCheck = unfilledFields || [];
    const removeField = arrayForCheck.filter(field => field !== name);
    const newUnfilledFields = [{
      studentIndex: indexStudent,
      unfilledFields: removeField,
    }];
    addUnfilledFields(newUnfilledFields);
  }

  checkForErrors = () => {
    const { currentStudents, indexStudent } = this.props;
    const currentStudent = currentStudents.find((item, i) => i === indexStudent) || {};
    const { isError } = currentStudent;
    return isError;
  }

  render() {
    const {
      isOpen,
      firstName,
      lastName,
      notifyEmail,
      notifySms,
      firstEmail,
      secondEmail,
      firstPhone,
      secondPhone,
      errors,
      streetAddress,
      studentTaxonomies,
      note,
    } = this.state;
    const {
      indexStudent = 1,
      hasPhysical,
      taxonomies,
      deleteStudent,
      isOneStudent,
    } = this.props;

    return (
      <StudentProfileWrapper>
        <section className={b()}>
          <div
            role="button"
            tabIndex="-1"
            className={b('block', { 'is-error': this.checkForErrors() })}
          >
            <div
              className={b('block-text')}
              onClick={this.clickStudentBlock}
            >
              <IntlMessages id="students.student" />
              <div className={b('students-count')}>{indexStudent + 1}</div>
              {firstName && (<div className={b('firstname')}>{firstName}</div>)}
              {lastName && (<div className={b('lastname')}>{lastName}</div>)}
            </div>
            <div className={b('block-icon')}>
              {!isOneStudent && <Icon type="delete" className={b('delete-btn')} onClick={() => deleteStudent(indexStudent)} />}
              {isOpen
                ? (
                  <ArrowUp
                    className={b('block-icon-down')}
                    onClick={this.clickStudentBlock}
                  />
                )
                : (
                  <ArrowUp
                    className={b('block-icon-right')}
                    onClick={this.clickStudentBlock}
                  />
                )
              }
            </div>
          </div>
          {isOpen && (
            <div className={form()}>
              <div className={form('firstname')}>
                <div className={form('firstname-title')}>
                  <IntlMessages id="groupAdmin.firstName" />
                </div>
                <CustomTextInput
                  className={form('firstname-input')}
                  type="text"
                  value={firstName}
                  name="firstName"
                  placeholder={firstNameTitle}
                  onChange={this.addFirstName}
                  error={errors.firstName || this.checkForUnfilledField('firstName')}
                  onBlur={this.onBlurValidation}
                />
              </div>
              <div className={form('lastname')}>
                <div className={form('lastname-title')}>
                  <IntlMessages id="groupAdmin.lastName" />
                </div>
                <CustomTextInput
                  className={form('lastname-input')}
                  type="text"
                  value={lastName}
                  name="lastName"
                  placeholder={lastNameTitle}
                  onChange={this.addLastName}
                  error={errors.lastName || this.checkForUnfilledField('lastName')}
                  onBlur={this.onBlurValidation}
                />
              </div>
              {hasPhysical && (
                <div className={form('lastname')}>
                  <div className={form('lastname-title')}>
                    <IntlMessages id="courses.streetAddress" />
                  </div>
                  <CustomTextInput
                    className={form('lastname-input')}
                    type="text"
                    value={streetAddress}
                    name="streetAddress"
                    placeholder={streetAddressPlaceholder}
                    onChange={this.handleChangeAddressStreet}
                    error={errors.streetAddress || this.checkForUnfilledField('streetAddress')}
                    onBlur={this.handleBlurValidationStreetAddress}
                  />
                </div>
              )}
              <AddInput
                title={<IntlMessages id="groupAdmin.eMail" />}
                addTitle={<IntlMessages id="groupAdmin.eMailAdd" />}
                placeholder={emailTitle}
                valueFirstInput={firstEmail}
                valueSecondInput={secondEmail}
                errorFirstInput={errors.firstEmail || this.checkForUnfilledField('firstEmail')}
                nameFirstInput="firstEmail"
                errorSecondInput={errors.secondEmail}
                nameSecondInput="secondEmail"
                handleChange={this.handleChangeEmails}
                name="email"
                onBlur={this.onBlurValidation}
                unSetError={this.unSetError}
              />
              <AddInput
                title={<IntlMessages id="groupAdmin.telephone" />}
                addTitle={<IntlMessages id="groupAdmin.telephoneAdd" />}
                placeholder={telephoneTitle}
                valueFirstInput={firstPhone}
                valueSecondInput={secondPhone}
                errorFirstInput={errors.firstPhone}
                nameFirstInput="firstPhone"
                errorSecondInput={errors.secondPhone}
                nameSecondInput="secondPhone"
                handleChange={this.handleChangePhones}
                name="phone"
                onBlur={this.onBlurValidation}
                unSetError={this.unSetError}
              />
              <div className={form('lastname')}>
                <div className={form('lastname-title')}>
                  <IntlMessages id="note.word" />
                </div>
                <CustomTextInput
                  className={form('lastname-input')}
                  type="text"
                  value={note}
                  name="note"
                  placeholder={enterNote}
                  onChange={this.handleChange}
                />
              </div>
              <div className={form('select-title')}>
                <IntlMessages id="groupAdmin.lang" />
              </div>
              <SelectAnyTime
                status={false}
                className={form('select')}
                handleDataSave={this.handleLangSave}
              />
              <div className={form('notification-title')}>
                <IntlMessages id="students.notificationTitle" />
              </div>
              <div className={form('notification')}>
                <IntlMessages id="groupAdmin.userNotification" />
              </div>
              <div className={form('checkbox-group')}>
                <Checkbox
                  name="notifyEmail"
                  handleCheck={this.handleCheck}
                  value={notifyEmail}
                  title={<IntlMessages id="groupAdmin.checkEmail" />}
                />
                <Checkbox
                  handleCheck={this.handleCheck}
                  name="notifySms"
                  value={notifySms}
                  title={<IntlMessages id="groupAdmin.checkSms" />}
                />
              </div>
              {taxonomies && taxonomies.length > 0 && (
                <div className={form('taxonomy')}>
                  <div className={form('taxonomy-title')}>
                    <IntlMessages id="students.taxonomyTitle" />
                  </div>
                  {taxonomies.map((item) => {
                    const taxonomyValue = studentTaxonomies.find(taxonomy => taxonomy.taxonomy.id === item.id);
                    return (
                      <div key={item.id}>
                        <div className={form('taxonomy-title-input')}>
                          {item.title}
                        </div>
                        <CustomTextInput
                          className={form('taxonomy-input')}
                          type="text"
                          value={taxonomyValue && taxonomyValue.value}
                          name={item.title}
                          placeholder={item.format}
                          onChange={e => this.addTaxonomyData(e.target.value, item.id)}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </section>
      </StudentProfileWrapper>
    );
  }
}

StudentProfile.propTypes = {
  addErrorStatusToStudent: PropTypes.func,
  indexStudent: PropTypes.number,
  changeCheckbox: PropTypes.func,
  addInputLang: PropTypes.func,
  addInputFirstName: PropTypes.func,
  addInputLastName: PropTypes.func,
  addInputPersonNumber: PropTypes.func,
  addInputEmployeeNumber: PropTypes.func,
  addInputEmail: PropTypes.func,
  addInputPhone: PropTypes.func,
  currentStudents: PropTypes.arrayOf(PropTypes.shape({})),
  taxonomies: PropTypes.arrayOf(PropTypes.shape({})),
  addUnfilledFields: PropTypes.func,
};

StudentProfile.defaultProps = {
  addErrorStatusToStudent: () => null,
  indexStudent: 0,
  changeCheckbox: () => null,
  addInputLang: () => null,
  addInputFirstName: () => null,
  addInputLastName: () => null,
  addInputPersonNumber: () => null,
  addInputEmployeeNumber: () => null,
  addInputPhone: () => null,
  addInputEmail: () => null,
  currentStudents: [],
  addUnfilledFields: () => null,
  taxonomies: [],
};
export default StudentProfile;

import { Banner, Checkbox, SearchAdminBlock, DefaultButton } from 'components';
import IntlMessages from 'components/utility/intlMessages';
import LayoutContent from 'components/utility/layoutContent';
import { PLACEHOLDER } from 'constants/constants';
import _ from 'lodash';
import qs from 'qs';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import studentsActions from 'redux/students/actions';
import URLS from 'redux/urls';
import { getCurrentStudentsFp, getSearchStudentsDataFp } from 'selectors';
import { bemlds } from 'utils';

import FindStudentsWrapper from './FindStudents.style';

const {
  firstNameTitle,
  lastNameTitle,
  emailTitle,
  telephoneTitle,
  personTitle,
  employeeTitle,
} = PLACEHOLDER;

const titleBem = bemlds('title');
const page = bemlds('page');
const student = bemlds('student');
const btn = bemlds('button');
const main = bemlds('main');

const urlCurrentStudent = id => `${URLS.studentsInfoUrl}/${id}`;

class FindStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      personNumber: '',
      employeeNumber: '',
      isDeactivated: false,
    };
  }

  handleChangeCheckbox = (value) => {
    this.handleChange({ target: { value, name: 'isDeactivated' } });
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSearchStudents = () => {
    const {
      searchStudents,
    } = this.props;

    const {
      firstName,
      lastName,
      email,
      phone,
      personNumber,
      employeeNumber,
    } = this.state;

    const query = _.pickBy({
      firstName,
      lastName,
      email,
      phone,
      personNumber,
      employeeNumber,
    }, _.identity);
    searchStudents(qs.stringify(query));
  };

  componentDidMount = () => {
    const { clearStudentsStore } = this.props;
    clearStudentsStore();
  }

  render() {
    const {
      setCurrentStudentId,
      searchStudentsData,
    } = this.props;

    const {
      firstName,
      lastName,
      email,
      phone,
      personNumber,
      employeeNumber,
      isDeactivated,
    } = this.state;

    return (
      <LayoutContent>
        <FindStudentsWrapper>
          <Banner title={<IntlMessages id="students.infoFindBanner" />} />
          <section className={titleBem()}>
            <div className={titleBem('item')}>
              <IntlMessages id="students.findStudentsTitle" />
            </div>
          </section>
          <section className={page()}>
            <section className={page('left')}>
              <div className={student()}>
                <div className={student('firstname')}>
                  <div className={student('firstname-title')}>
                    <IntlMessages id="tutors.firstNameLabel" />
                  </div>
                  <input
                    className={student('firstname-input')}
                    type="text"
                    value={firstName}
                    name="firstName"
                    placeholder={firstNameTitle}
                    onChange={this.handleChange}
                  />
                </div>
                <div className={student('lastname')}>
                  <div className={student('lastname-title')}>
                    <IntlMessages id="tutors.lastNameLabel" />
                  </div>
                  <input
                    className={student('lastname-input')}
                    type="text"
                    value={lastName}
                    name="lastName"
                    placeholder={lastNameTitle}
                    onChange={this.handleChange}
                  />
                </div>
                <div className={student('email')}>
                  <div className={student('email-title')}>
                    <IntlMessages id="groupAdmin.findEMail" />
                  </div>
                  <input
                    className={student('email-input')}
                    type="text"
                    value={email}
                    name="email"
                    placeholder={emailTitle}
                    onChange={this.handleChange}
                  />
                </div>
                <div className={student('telephone')}>
                  <div className={student('telephone-title')}>
                    <IntlMessages id="groupAdmin.findTelephone" />
                  </div>
                  <input
                    className={student('telephone-input')}
                    type="text"
                    value={phone}
                    name="phone"
                    placeholder={telephoneTitle}
                    onChange={this.handleChange}
                  />
                </div>
                <div className={student('person')}>
                  <div className={student('person-title')}>
                    <IntlMessages id="students.personNumberTitle" />
                  </div>
                  <input
                    className={student('person-input')}
                    type="text"
                    value={personNumber}
                    name="personNumber"
                    placeholder={personTitle}
                    onChange={this.handleChange}
                  />
                </div>
                <div className={student('employee')}>
                  <div className={student('employee-title')}>
                    <IntlMessages id="students.employeeNumberTitle" />
                  </div>
                  <input
                    className={student('employee-input')}
                    type="text"
                    value={employeeNumber}
                    name="employeeNumber"
                    placeholder={employeeTitle}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <Checkbox
                handleCheck={this.handleChangeCheckbox}
                name="isDeactivated"
                value={isDeactivated}
                title={<IntlMessages id="groupAdmin.findCheck" />}
              />
              <div className={btn()}>
                <DefaultButton
                  textId="organisations.searchBtn"
                  onClick={this.handleSearchStudents}
                />
              </div>
            </section>
            <section className={page('right')}>
              {searchStudentsData && searchStudentsData.length ? (
                <div className={main('title')}>
                  <IntlMessages id="groupAdmins.found" />
                  {searchStudentsData.length}
                  <IntlMessages id="groupAdmins.foundGroupAdmins" />
                </div>
              ) : (
                <div className={main('not-found')}>
                  <IntlMessages id="lmsGroups.noResultsFound" />
                </div>
              )}
              <div className={main('search-groups')}>
                {searchStudentsData && searchStudentsData.map(item => (
                  <SearchAdminBlock
                    key={item.id}
                    obj={item}
                    url={urlCurrentStudent(item.id)}
                    onClick={() => setCurrentStudentId(item.id)}
                  />
                ))}
              </div>
            </section>
          </section>
        </FindStudentsWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const currentStudents = getCurrentStudentsFp(state);
  const searchStudentsData = getSearchStudentsDataFp(state);

  return {
    currentStudents,
    searchStudentsData,
  };
};

export default connect(
  mapStateToProps,
  {
    ...studentsActions,
  },
)(FindStudents);

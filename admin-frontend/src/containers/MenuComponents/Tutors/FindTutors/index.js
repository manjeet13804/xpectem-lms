import {
  Banner,
  Checkbox,
  SearchAdminBlock,
  SearchSvg,
  DefaultButton,
} from 'components';
import IntlMessages from 'components/utility/intlMessages';
import LayoutContent from 'components/utility/layoutContent';
import { PLACEHOLDER } from 'constants/constants';
import _ from 'lodash';
import { PropTypes } from 'prop-types';
import qs from 'qs';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import tutorsActions from 'redux/tutors/actions';
import URLS from 'redux/urls';
import { getSearchTutorDataFp } from 'selectors';
import { bemlds } from 'utils';

import { MAIN_ROUTE } from '../../../../constants/routes';
import TutorsFindWrapper from './findTutors.style';

const page = bemlds('page');
const tutor = bemlds('tutor-find');

const {
  enterFirstName,
  enterLastName,
  enterEmail,
  enterPhone,
} = PLACEHOLDER;

const { tutorsFiles } = MAIN_ROUTE;

const defaultProps = {
  getTutorsByParameters: null,
  searchTutorData: [],
  setCurrentTutor: null,
  clearSearchTutors: () => null,
};

const propTypes = {
  getTutorsByParameters: PropTypes.func,
  searchTutorData: PropTypes.arrayOf(PropTypes.object),
  setCurrentTutor: PropTypes.func,
  clearSearchTutors: PropTypes.func,
};

class TutorsFind extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      telephone: '',
      isDeactivated: false,
    };
  }

  componentDidMount = () => {
    const { clearSearchTutors } = this.props;
    clearSearchTutors();
  }

  onChangeInput = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  getAdminUrl = (id) => {
    const { match: { path } } = this.props;
    const isFilesPage = path.includes('files');
    if (isFilesPage) {
      return `${tutorsFiles}/${id}`;
    }

    return `${URLS.tutorsEdit}/${id}`;
  }

  clickSearch = () => {
    const {
      firstName,
      lastName,
      email,
      telephone,
      isDeactivated,
    } = this.state;

    const { getTutorsByParameters } = this.props;

    const query = _.pickBy({
      firstName,
      lastName,
      email,
      telephone,
      isDeactivated,
    }, _.identity);

    getTutorsByParameters(qs.stringify(query));
  }

  handleDeactivateCheck = value => this.setState({ isDeactivated: value });

  render() {
    const {
      firstName,
      lastName,
      email,
      telephone,
      isDeactivated,
    } = this.state;

    const {
      searchTutorData,
      setCurrentTutor,
    } = this.props;

    return (
      <LayoutContent>
        <TutorsFindWrapper>
          <Banner title={<IntlMessages id="tutors.findTutorsBanner" />} />
          <section className={page()}>
            <section className={page('left')}>
              <div className={tutor()}>
                <div className={tutor('title')}>
                  <IntlMessages id="tutors.findTitle" />
                </div>
                <div className={tutor('input')}>
                  <div className={tutor('input-title')}>
                    <IntlMessages id="tutors.firstNameLabel" />
                  </div>
                  <div className={tutor('input-block')}>
                    <SearchSvg />
                    <input
                      className={tutor('input-text')}
                      type="text"
                      value={firstName}
                      name="firstName"
                      placeholder={enterFirstName}
                      onChange={this.onChangeInput}
                    />
                  </div>
                </div>
                <div className={tutor('input')}>
                  <div className={tutor('input-title')}>
                    <IntlMessages id="tutors.lastNameLabel" />
                  </div>
                  <div className={tutor('input-block')}>
                    <SearchSvg />
                    <input
                      className={tutor('input-text')}
                      type="text"
                      value={lastName}
                      name="lastName"
                      placeholder={enterLastName}
                      onChange={this.onChangeInput}
                    />
                  </div>
                </div>
                <div className={tutor('input')}>
                  <div className={tutor('input-title')}>
                    <IntlMessages id="tutors.emailLabel" />
                  </div>
                  <div className={tutor('input-block')}>
                    <SearchSvg />
                    <input
                      className={tutor('input-text')}
                      type="text"
                      value={email}
                      name="email"
                      placeholder={enterEmail}
                      onChange={this.onChangeInput}
                    />
                  </div>
                </div>
                <div className={tutor('input')}>
                  <div className={tutor('input-title')}>
                    <IntlMessages id="tutors.telephoneLabel" />
                  </div>
                  <div className={tutor('input-block')}>
                    <SearchSvg />
                    <input
                      className={tutor('input-text')}
                      type="text"
                      value={telephone}
                      name="telephone"
                      placeholder={enterPhone}
                      onChange={this.onChangeInput}
                    />
                  </div>
                </div>
                <div className={tutor('input-checkbox')}>
                  <Checkbox
                    handleCheck={this.handleDeactivateCheck}
                    title={<IntlMessages id="tutors.checkboxLabel" />}
                    value={isDeactivated}
                  />
                </div>
                <div className={tutor('input-button')}>
                  <DefaultButton
                    textId="tutors.searchButton"
                    onClick={this.clickSearch}
                  />
                </div>
              </div>
            </section>
            <section className={page('right')}>
              {searchTutorData.length ? (
                <div className={tutor('')}>
                  <div className={tutor('title-found')}>
                    <IntlMessages id="tutors.foundLabel" />
                    {searchTutorData.length}
                    <IntlMessages id="tutors.usersLabel" />
                  </div>
                  {searchTutorData.map(item => (
                    <SearchAdminBlock
                      key={item.id}
                      obj={item}
                      url={this.getAdminUrl(item.id)}
                      onClick={() => setCurrentTutor(item.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className={page('not-found')}>
                  <IntlMessages id="lmsGroups.noResultsFound" />
                </div>
              )}
            </section>
          </section>

        </TutorsFindWrapper>
      </LayoutContent>
    );
  }
}

TutorsFind.propTypes = propTypes;
TutorsFind.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  const searchTutorData = getSearchTutorDataFp(state);

  return {
    searchTutorData,
  };
};

export default connect(mapStateToProps, { ...tutorsActions })(TutorsFind);

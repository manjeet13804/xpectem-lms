import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import { PLACEHOLDER } from 'constants/constants';
import { bemlds } from 'utils';
import {
  Banner,
  AddInput,
  SelectAnyTime,
  Checkbox,
  AddPhoto,
  BannerNotification,
  CreatedAtBlock,
} from 'components';
import AdministratorsEditProfileWrapper from './EditOrgAdministrator.style';

const {
  firstNameTitle,
  lastNameTitle,
  eMailTitle,
  telephoneTitle,
} = PLACEHOLDER;

const page = bemlds('page');
const form = bemlds('form');
const profile = bemlds('profile-image');

const testUrlToDelete = '/organisation-administrators/delete/1';
const testUrlAddRemove = '/organisation-administrators/add';

class AdministratorsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      eMail: '',
      telephone: '',
      clickSave: false,
    };
  }
  onChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };
  clickSaveHandle = (value) => {
    this.setState({clickSave: value});
  };
  render() {
    const {
      firstName,
      lastName,
      clickSave,
    } = this.state;
    return (
      <LayoutContent>
        <AdministratorsEditProfileWrapper>
          <Banner title={<IntlMessages id="orgAdmins.editBanner" />} />
          {clickSave && (
            <BannerNotification
              error={false}
              title={<IntlMessages id="orgAdmins.editTitle" />}
              clickSaveHandle={this.clickSaveHandle}
            />
          )}
          <section className={page()}>
            <section className={page('left')}>
              <section className={form()}>
                <div className={form('title')}>
                  {<IntlMessages id="groupAdmin.editTitle" />}
                </div>
                <div className={form('firstname')}>
                  <div className={form('firstname-title')}>
                    {<IntlMessages id="groupAdmin.firstName" />}
                  </div>
                  <input
                    className={form('firstname-input')}
                    type="text"
                    value={firstName}
                    name="firstName"
                    placeholder={firstNameTitle}
                    onChange={this.onChange}
                  />
                </div>
                <div className={form('lastname')}>
                  <div className={form('lastname-title')}>
                    {<IntlMessages id="groupAdmin.lastName" />}
                  </div>
                  <input
                    className={form('lastname-input')}
                    type="text"
                    value={lastName}
                    name="lastName"
                    placeholder={lastNameTitle}
                    onChange={this.onChange}
                  />
                </div>
                <AddInput
                  title={<IntlMessages id="groupAdmin.eMail" />}
                  addTitle={<IntlMessages id="groupAdmin.eMailAdd" />}
                  placeholder={eMailTitle}
                />
                <AddInput
                  title={<IntlMessages id="groupAdmin.telephone" />}
                  addTitle={<IntlMessages id="groupAdmin.telephoneAdd" />}
                  placeholder={telephoneTitle}
                />
                <div className={form('select-title')}>
                  {<IntlMessages id="groupAdmin.lang" />}
                </div>
                <SelectAnyTime
                  status={false}
                  className={form('select')}
                />
                <div className={form('notification')}>
                  {<IntlMessages id="groupAdmin.userNotification" />}
                </div>
                <div className={form('checkbox-group')}>
                  <Checkbox title={<IntlMessages id="groupAdmin.checkEmail" />}/>
                  <Checkbox title={<IntlMessages id="groupAdmin.checkSms" />} />
                </div>
                <div className={form('organisations')}>
                  <div className={form('organisations-title')}>
                    <IntlMessages id="orgAdmins.orgAddRemoveTitle"/>
                  </div>
                  <div className={form('organisations-text')}>
                    {<IntlMessages id= "orgAdmins.orgAddRemoveText" />}
                  </div>
                  <Link className={form('link')} to={testUrlAddRemove}>
                    <div className = {form('button')}>
                      <button className={form('button-add')}>
                        {<IntlMessages id="orgAdmins.addRemoveBtn" />}
                      </button>
                    </div>
                  </Link>
                </div>
              </section>
            </section>
            <section className={page('right')}>
              <div className={profile()}>
                <CreatedAtBlock />
                <div className={profile('title')} />
                <AddPhoto />
                <div className={profile('button')}>
                  <Link className={profile('link')} to={testUrlToDelete}>
                    <button className={profile('button-delete')}>
                      {<IntlMessages id="groupAdmin.deleteBtn" />}
                    </button>
                  </Link>
                  <button
                    className={profile('button-save')}
                    onClick={() => this.clickSaveHandle(true)}
                  >
                    {<IntlMessages id="groupAdmin.saveBtn" />}
                  </button>
                </div>
              </div>
            </section>
          </section>
        </AdministratorsEditProfileWrapper>
      </LayoutContent>
    );
  }
}

export default AdministratorsEdit;

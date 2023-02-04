import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LayoutContent from 'components/utility/layoutContent';
import { PLACEHOLDER } from 'constants/constants';
import IntlMessages from 'components/utility/intlMessages';
import {
  Banner,
  DeleteAttentionSvg,
  DefaultButton,
} from 'components';
import { bemlds } from 'utils';
import ProfileDeleteWrapper from './ProfileDelete.style';

const { confirmDelete } = PLACEHOLDER;

const b = bemlds('delete-block');
const btn = bemlds('button');

const deleteConfirm = (string) => string.trim().toLowerCase() !== 'delete';

class ProfileDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }
  inputChange = (event) => {
    this.setState({inputValue: event.target.value});
  };

  render() {
    const { inputValue } = this.state;
    return (
      <LayoutContent>
        <ProfileDeleteWrapper>
          <Banner title={<IntlMessages id="groupAdmin.bannerDelete" />} />
          <section className={b()}>
            <DeleteAttentionSvg />
            <section className={b('text')}>
              <div className={b('text-title')}>
                {<IntlMessages id="groupAdmin.deleteTitle" />}
              </div>
              <div className={b('text-message')}>
                {<IntlMessages id="groupAdmin.deleteAttention" />}
              </div>
              <div className={b('text-confirm')}>
                {<IntlMessages id="groupAdmin.deleteConfirm" />}
              </div>
              <input
                className={b('text-input')}
                type="text"
                value={inputValue}
                placeholder={confirmDelete}
                onChange={this.inputChange}
              />
              <section className={btn()}>
                <Link className={btn('link')} to="/profile/delete/confirm">
                  <DefaultButton
                    textId="groupAdmin.deleteBtn"
                    isDelete
                    disabled={deleteConfirm(inputValue)}
                  />
                </Link>
                <DefaultButton
                  textId="groupAdmin.cancelBtn"
                />
              </section>
            </section>
          </section>
        </ProfileDeleteWrapper>
      </LayoutContent>
    );
  }
}

export default ProfileDelete;

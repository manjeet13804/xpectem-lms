import React, { Component } from 'react';
import { connect } from 'react-redux';
import URLS from 'redux/urls';
import lmsGroupsActions from 'redux/lmsGroups/actions';
import IntlMessages from 'components/utility/intlMessages';
import LayoutContent from 'components/utility/layoutContent';
import { bemlds } from 'utils';
import { PLACEHOLDER } from 'constants/constants';
import { REGEXP } from 'constants/regexp';
import {
  Banner,
  DeleteAttentionSvg,
  DefaultButton,
} from 'components';

import LmsGroupsDeleteWrapper from './LmsGroupsDelete.style';

const { lmsGroupsDelete } = PLACEHOLDER;
const { getDeleteId } = REGEXP;

const deleteConfirm = (string) => string.trim().toLowerCase() !== 'delete';

const b = bemlds('delete-block');
const btn = bemlds('button');

class LmsGroupsDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  componentWillMount() {
    const { getCurrentLmsGroup, id } = this.props;
    getCurrentLmsGroup(id);
  };

  clickCancel = () => {
    const { history, id } = this.props;
    if (id >= 0)  { history.push(`${URLS.lmsGroupsEditUrl}/${id}`); }
  };

  inputChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  deleteConfirm = () => {
    const { id, deleteLmsGroup, history } = this.props;

    deleteLmsGroup(id, history);
  }

  render() {
    const { inputValue } = this.state;
    const { id, currentLmsGroup } = this.props;


    if (!id || !currentLmsGroup) return null;

    const { name } = currentLmsGroup;

    const isDisable = deleteConfirm(inputValue);

    return (
      <LayoutContent>
        <LmsGroupsDeleteWrapper>
          <Banner title={<IntlMessages id="lmsGroups.deleteBanner" />} />
          <section className={b()}>
            <DeleteAttentionSvg />
            <section className={b('text')}>
              <div className={b('text-title')}>
                <IntlMessages id="lmsGroups.sureDelete" />
                {name} ?
              </div>
              <div className={b('text-message')}>
                <IntlMessages id="lmsGroups.attentionMessage" />
                {`${name}.`}
              </div>
              <div className={b('text-confirm')}>
                <IntlMessages id="lmsGroups.confirmMessage" />
              </div>
              <input
                className={b('text-input')}
                type="text"
                value={inputValue}
                name="inputValue"
                placeholder={lmsGroupsDelete}
                onChange={this.inputChange}
              />
              <section className={btn()}>
                <DefaultButton
                  textId="lmsGroups.deleteBtn"
                  onClick={this.deleteConfirm}
                  disabled={isDisable}
                  isDelete
                />
                <DefaultButton
                  textId="lmsGroups.cancelButton"
                  onClick={this.clickCancel}
                />
              </section>
            </section>
          </section>
        </LmsGroupsDeleteWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    router: { location },
    lmsGroups: { currentId, currentLmsGroup },
  } = state;

  const { pathname } = location;
  const res = pathname && pathname.match(getDeleteId);
  const id = currentId || res[1];

  return { id, currentLmsGroup };
};

export default connect(mapStateToProps, { ...lmsGroupsActions })(LmsGroupsDelete);

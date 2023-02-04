import React, { Component } from 'react';
import { connect } from 'react-redux';
import URLS from 'redux/urls';
import groupsActions from 'redux/groups/actions';
import { getCurrentGroupFp } from 'selectors';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import { COLORS } from 'constants/constants';
import { bemlds } from 'utils';
import {
  Banner,
  BannerNotification,
  DeleteAttentionSvg,
} from 'components';
import GroupsDeleteConfirmWrapper from './GroupsDeleteConfirm.style';

const b = bemlds('confirm');

class GroupsDeleteConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickSave: true,
    };
  }

  clickSaveHandle = (value = true) => {
    this.setState({clickSave: value});
  };

  componentWillMount() {
    const { currentGroup: { name } = {}, history } = this.props;

    if (!name) { history.push(`${URLS.groupsEdit}`); }
  };

  render() {
    const { clickSave } = this.state;
    const { currentGroup: { name } = {} } = this.props;

    return (
      <LayoutContent>
        <GroupsDeleteConfirmWrapper>
          <Banner title={<IntlMessages id="groups.deleteBanner" />} />
          {clickSave && (
            <BannerNotification
              error={false}
              title={`The organisation - ${name} is deleted!`}
              clickSaveHandle={this.clickSaveHandle}
            />
          )}
          <section className={b()}>
            <DeleteAttentionSvg fill={COLORS.black} className={b('icon')} />
            <div className={b('title')}>
              {`The organisation - ${name} is deleted!`}
            </div>
          </section>
        </GroupsDeleteConfirmWrapper>
      </LayoutContent>
    );
  }
}


const mapStateToProps = (state) => {
  const currentGroup = getCurrentGroupFp(state);

  return {
    currentGroup,
  };
};

export default connect(mapStateToProps, { ...groupsActions })(GroupsDeleteConfirm);

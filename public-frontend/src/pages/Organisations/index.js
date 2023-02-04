// @flow
import React from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';

import { Page } from 'pages';
import {
  GroupItemCard,
  AddUserBtn,
  TableContent,
  TableSearchControls,
} from 'components';

import block from 'utils/bem';

import {
  getUserRoles,
  getGroupsAsArray,
  getOrganisations,
} from 'redux/selectors';
import {
  actionGetOrganisationGroup,
  actionGetOrganisationsAndGroups,
} from 'redux/actions';

import { TERM_SHARED } from 'localise';
import { POPUPS_PROPS, POPUPS_RENDER } from './constants';

import './organisations.scss';

const bem = block('organisations');

type StateType = {
  popupShow: string,
  checkedList: object
};

class OrganisationsPage extends Page <null, StateType> {
  constructor() {
    super();
    this.bem = bem;
    this.state = {
      popupShow: POPUPS_PROPS.hide,
      checkedList: this.setListCheckbox(false),
    };
  }

  componentDidMount() {
    const {getOrganisationsAndGroups} = this.props;
    getOrganisationsAndGroups();
  }

  togglerPopup = (popupName: string) => {
    this.setState({
      popupShow: popupName,
    });
  };

  renderControls = (props: object): Node => (
    <TableSearchControls
      clickHandler={(): void => this.togglerPopup(POPUPS_PROPS.addGroup)}
      {...props}
    />
  )

  renderGroupCard = (props: object): Node => {
    const { checkedList } = this.state;
    const { id } = props.data;
    return (
      <GroupItemCard
        checkItem={this.toggleItem}
        openPopup={(): void => this.togglerPopup(POPUPS_PROPS.renameGroup)}
        checked={checkedList[id]}
        {...props}
      />
    );
  }

  toggleOrganisations = (id: null | string) => {
    const {getGroupsByOrganisationId} = this.props;
    getGroupsByOrganisationId(id);
  }

  renderContent = (): Node => {
    const { popupShow } = this.state;
    const {groups, organisations} = this.props;
    return (
      <React.Fragment>
        <div className={bem('wrap')}>
          <AddUserBtn
            text={TERM_SHARED.addOrganisation}
            clickHandler={() => { this.togglerPopup(POPUPS_PROPS.admin); }}
          />
        </div>
        {
          <TableContent
            row={this.renderGroupCard}
            controls={this.renderControls}
            renderList={groups}
            organisationList={organisations}
            checkedList={this.checkedList}
            toggleOrganisations={this.toggleOrganisations}
          />
        }

        {
          POPUPS_RENDER.map((item: {name: string, tag: Node}): Node => {
            const { tag: Tag, name } = item;
            return (
              (name === popupShow)
              && (
              <Tag close={() => { this.togglerPopup(POPUPS_PROPS.hide); }} />
              )
            );
          })
        }
      </React.Fragment>
    );
  }
}

const stateProps = (state: object): object => ({
  userRole: getUserRoles(state),
  groups: getGroupsAsArray(state),
  organisations: getOrganisations(state),
});

const dispatchProps = {
  getGroupsByOrganisationId: actionGetOrganisationGroup,
  getOrganisationsAndGroups: actionGetOrganisationsAndGroups,
};

export default connect(stateProps, dispatchProps)(OrganisationsPage);

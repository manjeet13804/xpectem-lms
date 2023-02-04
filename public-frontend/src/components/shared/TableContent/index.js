// @flow
import React, { Component } from 'react';
import type {Node} from 'react';
import { connect } from 'react-redux';

import {actionSetOrganisationId} from 'redux/actions';
import {
  getOrganisations,
  getCurrentOrganisationId,
} from 'redux/selectors';
import type OrganisationType from 'models';
import {
  SwitchTable,
  TableCaption,
} from 'components';
import block from 'utils/bem';
import './table-content.scss';

const bem = block('table-content');

const DefaultProps = {
  controls: null,
  showCaption: false,
  showSwitchControl: false,
  toggleOrganisations: () => {},
};

type PropsType = {
  controls?: Node,
  showCaption?: boolean,
  showSwitchControl?: boolean,
  renderList: Array,
  optionsSort: Array,
  row: Node,
  setActiveOrganisation: (string | number) => void,
  organisationList: Array<OrganisationType>,
  toggleOrganisations?: () => void,
  organisationList: Array<OrganisationType>,
  activeOrganisation: string | number
};

type StateType = {
  isShowList: boolean,
  activeName: string
};

class TableContent extends Component <PropsType, StateType> {
  constructor() {
    super();
    this.state = {
      isShowList: true,
    };
  }

  togglerList = () => {
    const { isShowList } = this.state;
    this.setState({
      isShowList: !isShowList,
    });
  }

  toggleSwitch = (id: string | number) => {
    const {toggleOrganisations} = this.props;
    toggleOrganisations(id);
    const { setActiveOrganisation } = this.props;
    setActiveOrganisation(id);
  }

  render(): Node {
    const {
      renderList,
      row: TagComponent,
      controls: TagControls,
      organisationList,
      showCaption,
      showSwitchControl,
      optionsSort,
      activeOrganisation,
    } = this.props;

    const { isShowList } = this.state;
    const isSwitchShow = isShowList && organisationList && organisationList.length > 0;
    const isControlsBtnShow = organisationList && organisationList.length > 0;

    return (
      <React.Fragment>
        {
        showCaption
        && (
        <TableCaption
          className={bem('caption')}
          togglerList={this.togglerList}
          optionsSort={optionsSort}
          isShow={isShowList}
          isToggleBtn={isControlsBtnShow}
        />
        )
      }
        <section className={bem()}>
          {
            isSwitchShow
            && (
              <SwitchTable
                isSharedControl={showSwitchControl}
                activeName={activeOrganisation}
                toggleSwitch={this.toggleSwitch}
                switchList={organisationList}
              />
            )
          }
          <div className={bem('list')}>
            {
              TagControls && (
                <TagControls
                  className={bem('item')}
                />
              )
            }
            {
              renderList && (renderList.map((item: string): Node => (
                <TagComponent
                  className={bem('item')}
                  key={item.id}
                  data={item}
                />
              )))
            }
          </div>
        </section>
      </React.Fragment>
    );
  }
}

TableContent.defaultProps = DefaultProps;

const stateProps = (state: object): object => ({
  organisationList: getOrganisations(state),
  activeOrganisation: getCurrentOrganisationId(state),
});

const dispatchProps = {
  setActiveOrganisation: actionSetOrganisationId,
};

export default connect(stateProps, dispatchProps)(TableContent);

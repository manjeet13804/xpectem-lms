// @flow
import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames/bind';
import block from 'utils/bem';
import type OrganisationType from 'models';

import { TERM_SHARED } from 'localise';
import './switch-table.scss';

const bem = block('switch-table');

const DefaultProps = {
  isSharedControl: false,
};

type PropsType = {
  activeName: string,
  isSharedControl?: boolean,
  switchList: Array<OrganisationType>,
  toggleSwitch: (string | number) => void
};

const SwitchTable = (props: PropsType): Node => {
  const {
    isSharedControl,
    switchList,
    toggleSwitch,
    activeName,
  } = props;
  const btnClass = classNames([
    `${bem('switch')}`,
    'btn',
    'btn--switch',
  ]);

  const activeBtn = activeName || switchList[0].id;

  const itemClass = (item: string): string => classNames(
    {
      [bem('item', {head: item === TERM_SHARED.allOrganisations})]: true,
      active: item === activeBtn,
    },
  );

  return (
    <ul className={`${bem()} list`}>
      {
        isSharedControl
        && (
          <li
            className={itemClass(TERM_SHARED.allOrganisations)}
            key={TERM_SHARED.allOrganisations}
          >
            <button
              className={btnClass}
              onClick={() => { toggleSwitch(TERM_SHARED.allOrganisations); }}
              type="button"
            >
              <span className={bem('text')}>{TERM_SHARED.allOrganisations}</span>
            </button>
          </li>
        )
      }
      {
        (switchList && switchList.length)
        && switchList.map((item: OrganisationType): Node => (
          <li
            className={itemClass(item.id)}
            key={item.id}
          >
            <button
              className={btnClass}
              onClick={() => { toggleSwitch(item.id); }}
              type="button"
            >
              <span className={bem('text')}>{item.name}</span>
            </button>
          </li>
        ))
      }
    </ul>
  );
};
SwitchTable.defaultProps = DefaultProps;

export default SwitchTable;

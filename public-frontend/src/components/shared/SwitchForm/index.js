// @flow

import React, {Component} from 'react';
import block from 'utils/bem';


import './switch.scss';

const switchBlock = block('switch');

const DefaultProps = {
  activePage: '',
  firstComponentAction: () => {},
  secondComponentAction: () => {},
};

type PropType = {
  firstComponentAction?: () => void,
  secondComponentAction?: () => void,
  firstComponentName: string,
  secondComponentName: string,
  activePage?: string
};


class Switch extends Component<PropType> {
  showActivePage = (panel: string): object | null => {
    const {activePage} = this.props;
    if (panel === activePage) return {active: true};
    return null;
  };

  render(): Node {
    const {
      firstComponentName,
      secondComponentName,
      firstComponentAction,
      secondComponentAction,
    } = this.props;

    return (
      <React.Fragment>
        <section className={switchBlock()}>
          <div
            className={switchBlock('button', this.showActivePage('first'))}
            onClick={firstComponentAction}
            role="button"
            tabIndex="0"
          >
            {firstComponentName}
          </div>
          <div
            className={switchBlock('button', this.showActivePage('second'))}
            onClick={secondComponentAction}
            role="button"
            tabIndex="0"
          >
            {secondComponentName}
          </div>
        </section>
        <hr className="line" />
      </React.Fragment>
    );
  }
}

Switch.defaultProps = DefaultProps;

export default Switch;

// @flow
import React, { PureComponent, SyntheticEvent } from 'react';
import type { Node } from 'react';
import { bemlds } from 'utils';
import {
  ArrowDown,
  ArrowUp,
} from 'components';


const DefaultProps = {
  openNav: false,
  title: null,
};

type PropsType = {
  openNav?: boolean,
  title?: string
};

const b = bemlds('adaptive-nav');

class AdaptiveNav extends PureComponent<PropsType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      openNav: props.openNav,
    };
  }

  clickNav = (): Node => {
    const {openChapter} = this.state;
    this.setState({openChapter: !openChapter});
  };

  render(): Node {
    const { openNav } = this.state;
    const { title } = this.props;
    return (
      <section className={b()}>
        <div
          role="button"
          tabIndex={0}
          className={b('first')}
          onClick={(): SyntheticEvent => this.clickNav()}
        >
          <div className={b('title')}>
            Course content
          </div>
          {
            openNav ? <ArrowUp /> : <ArrowDown />
          }
        </div>
        {openNav && (
          <div className={b('others')}>
            <div className={b('title')}>
              {title}
            </div>
          </div>
        )}
      </section>
    );
  }
}

AdaptiveNav.defaultProps = DefaultProps;

export default AdaptiveNav;

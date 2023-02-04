// @flow
import React, {PureComponent, Node, Fragment} from 'react';
import { bemlds } from 'utils';
import './styles.scss';

const b = bemlds('links');

type PropsType = {
  links: array[]
};

class Links extends PureComponent<PropsType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }

  render(): Node {
    const { links } = this.props;
    return (
      <section className={b()}>
        {links && links.length > 0 && (
          <Fragment>
            <div className={b('title')}>Links</div>
            <div className={b('text')}>
              Opens in a new window
            </div>
            {links.map(({id, url}: object): Node => (
              <div key={id} className={b('link')}>
                <a target="_blank" href="/" className={b('link-a')}>
                  {url}
                </a>
              </div>
            ))}
          </Fragment>
        )}
      </section>
    );
  }
}

export default Links;

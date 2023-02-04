// @flow
import React, {Node} from 'react';
import block from 'utils/bem';
import { TERM_SHARED } from 'localise';
import { BANNER } from '../../constants';

import './banner.scss';

const bem = block('banner');

const Banner = (): Node => (
  <article className={bem()} style={{ backgroundImage: `url(${BANNER.url})` }}>
    <div className={bem('info')}>
      <h1 className={bem('title')}>{TERM_SHARED.newCourse}</h1>
      <p className={bem('text')}>{BANNER.title}</p>
      <button className={`${bem('btn')} btn`} type="button">{TERM_SHARED.readMore}</button>
    </div>
  </article>
);

export default Banner;

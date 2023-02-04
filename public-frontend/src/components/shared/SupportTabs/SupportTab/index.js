// @flow
import React, {Node} from 'react';
import {Link} from 'react-router-dom';
import {withHover} from 'components';
import {bemlds} from 'utils';
import './styles.scss';

const block = bemlds('support-tab');

type PropType = {
    icon: Node,
    title: string,
    link: string,
    active: boolean,
    isHover: boolean,
    onMouseEnter: MouseEventHandler,
    onMouseLeave: MouseEventHandler
};

const SupportTab = withHover(
  ({
    icon: Icon,
    title,
    link,
    active,
    isHover,
    onMouseEnter,
    onMouseLeave,
  }: PropType): Node => {
    const isNeedShowIndicator = active || isHover;

    return (
      <Link className={block()} to={link}>
        <div
          className={block('content')}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {Icon && <Icon fill="#000000" className={block('icon')} />}
          <div className={block('title')}>
            {title}
          </div>
        </div>
        {isNeedShowIndicator && (
        <div className={block('indicator', { hover: isHover })} />
        )}
      </Link>
    );
  },
);

export default SupportTab;

import React from 'react';
import classNames from 'classnames';
import { LayoutContentWrapper } from './layoutWrapper.style';

export default (props) => {
  const { className, children } = props;
  const style = classNames({
    [className]: className,
    isoLayoutContentWrapper: true,
  });

  return (
    <LayoutContentWrapper
      className={style}
      {...props}
    >
      {children}
    </LayoutContentWrapper>
  );
};

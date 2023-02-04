// @flow
import React, { Node } from 'react';
import block from 'utils/bem';
import { sharedClass } from 'utils/className';
import { FOOTER_DICTIONARY } from 'localise';
import './copyright.scss';

const bem = block('copyright');

const DefaultProps = {
  className: '',
};

type PropType = {
  className?: string
};

const CopyRighting = (props: PropType): Node => {
  const { className} = props;
  const mainClass = sharedClass(bem, className);
  return (
    <p className={mainClass}>{FOOTER_DICTIONARY.copyright}</p>
  );
};
CopyRighting.defaultProps = DefaultProps;

export default CopyRighting;

// @flow
import React, { Node } from 'react';

const DefaultProps = {
  mod: '',
};

type PropType = {
  img: object,
  title: string,
  bem: (string | null) => string,
  mod?: string
};

const ImgCard = (props: PropType): Node => {
  const {
    img,
    title,
    bem,
    mod,
  } = props;
  const isMod = mod ? {[mod]: true} : null; // if used confirm mod && {} we have invalid selector
  return (
    <div className={bem('img-container', isMod)}>
      <img className={bem('img', isMod)} src={img} alt={title} />
    </div>
  );
};

ImgCard.defaultProps = DefaultProps;
export default ImgCard;

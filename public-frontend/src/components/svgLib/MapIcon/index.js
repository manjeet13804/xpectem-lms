// @flow
import React, {Node} from 'react';

const DefaultProps = {
  fill: '#fafafa',
  className: '',
};

type PropType = {
  fill?: string,
  className?: string
};


const MapIcon = (props: PropType): Node => {
  const { fill, className, ...svgProps } = props;
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill={fill}
      className={`${className} svg`}
      {...svgProps}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M18.6667 24.864V6.42133L9.33333 3.136V21.5787L18.6667 24.864ZM27.216 0C27.4151 0 27.5956 0.0808881 27.7573 0.242667C27.9191 0.404445 28 0.584888 28 0.784V24.2667C28 24.4409 27.9378 24.5964 27.8133 24.7333C27.6889 24.8702 27.552 24.9636 27.4027 25.0133L18.6667 28L9.33333 24.7147L0.821333 28C0.597332 28 0.404445 27.9191 0.242667 27.7573C0.0808881 27.5956 0 27.4151 0 27.216V3.73333C0 3.55911 0.0622216 3.40356 0.186667 3.26667C0.311112 3.12978 0.447999 3.03644 0.597333 2.98667L9.33333 0L18.6667 3.28533L26.992 0.0746667L27.216 0Z" />
    </svg>
  );
};

MapIcon.defaultProps = DefaultProps;

export default MapIcon;

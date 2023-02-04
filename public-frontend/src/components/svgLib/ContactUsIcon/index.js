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


const ContactUsIcon = (props: PropType): Node => {
  const { fill, className, ...svgProps } = props;
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill={fill}
      className={`${className} svg`}
      {...svgProps}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M24.0385 16C24.0385 16.4359 23.8782 16.8077 23.5577 17.1154C23.2372 17.4231 22.8462 17.5769 22.3846 17.5769H6.38462L0 24.0385V1.57692C0 1.14102 0.153845 0.769232 0.461538 0.461538C0.769232 0.153845 1.14102 0 1.57692 0H22.3846C22.8462 0 23.2372 0.153845 23.5577 0.461538C23.8782 0.769232 24.0385 1.14102 24.0385 1.57692V16ZM30.4231 6.38462C30.859 6.38462 31.2308 6.53846 31.5385 6.84615C31.8462 7.15385 32 7.52564 32 7.96154V32L25.6154 25.6154H7.96154C7.52564 25.6154 7.15385 25.4615 6.84615 25.1538C6.53846 24.8462 6.38462 24.4744 6.38462 24.0385V20.8077H27.1923V6.38462H30.4231Z" />
    </svg>
  );
};

ContactUsIcon.defaultProps = DefaultProps;

export default ContactUsIcon;

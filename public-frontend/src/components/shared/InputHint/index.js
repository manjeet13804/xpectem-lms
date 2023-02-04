// @flow
import React, {SynteticEvent} from 'react';
import block from 'utils/bem';
import {sharedClass} from 'utils/className';

import './input-hint.scss';

const DefaultProps = {
  className: '',
};

type PropsType = {
  close: object,
  className?: string,
  children: Node
};

const hintBlock = block('hint');

class InputHint extends React.Component<PropsType> {
  constructor(props: PropsType) {
    super(props);
    this.hint = React.createRef();
  }

  closeHint = (e: SynteticEvent) => {
    const {close} = this.props;
    let check = true;
    e.path.forEach((elem: Node) => {
      if (elem === this.hint.current) {
        check = false;
      }
    });

    if (check) close();
  };

  componentWillUnmount() {
    document.removeEventListener('click', this.closeHint, false);
  }

  componentWillMount() {
    document.addEventListener('click', this.closeHint, false);
  }

  render(): Node {
    const {children, className} = this.props;
    const hintClass = sharedClass(hintBlock(), className);
    return (
      <section className={hintClass} ref={this.hint}>
        {children}
      </section>
    );
  }
}

InputHint.defaultProps = DefaultProps;

export default InputHint;

// @flow
import React, {SynteticEvent} from 'react';
import block from 'utils/bem';
import {connect} from 'react-redux';
import {actionRequestDefault} from 'redux/actions';
import {sharedClass} from 'utils/className';

import './popup.scss';

const btn = block('btn');
const popup = block('popup');


type PropType = {
    close: () => void,
    children: Node,
    isRequestDefault?: boolean,
    requestDefault?: () => void
};

const DefaultProps = {
  isRequestDefault: false,
  requestDefault: () => {},
};

const btnCancel = sharedClass(btn({close: true}), popup('btn-close'));

class PopupContainer extends React.Component<PropType> {
  constructor(props: PropType) {
    super(props);
    this.veil = React.createRef();

    const {isRequestDefault, requestDefault} = this.props;
    if (isRequestDefault) requestDefault();
  }

  closePopup = (e: SynteticEvent) => {
    const {close} = this.props;
    if (e.target === this.veil.current) {
      close();
    }
  };

  render(): Node {
    const {children, close} = this.props;
    return (
      <div
        className="veil"
        ref={this.veil}
        onClick={this.closePopup}
        role="button"
        tabIndex="0"
      >
        <div className={popup()}>
          <button
            type="button"
            className={btnCancel}
            onClick={close}
          />
          {children}
        </div>
      </div>
    );
  }
}

PopupContainer.defaultProps = DefaultProps;

const mapDispatchToProps = {
  requestDefault: actionRequestDefault,
};

export default connect(null, mapDispatchToProps)(PopupContainer);

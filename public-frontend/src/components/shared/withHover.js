// @flow
import React, {AbstractComponent} from 'react';

const defaultProps = {
  mouseLeaveDelay: null,
};

type PropType = {
  mouseLeaveDelay?: number
};

type InjectedPropType = {
  isHover: boolean,
  onMouseEnter: MouseEventHandler,
  onMouseLeave: MouseEventHandler
};

const withHover = <Config: {}>(
  Component: AbstractComponent<Config>,
): React.AbstractComponent<Config & InjectedPropType> => (
    class HoverWrap extends React.Component<PropType> {
      static defaultProps = defaultProps;

      static displayName = `withHover (${Component.displayName})`;

      state = {
        isHover: false,
      };

      timerId = null;

      onMouseLeave = () => {
        const {mouseLeaveDelay} = this.props;
        if (mouseLeaveDelay) {
          this.resetTimer();
          this.timerId = setTimeout(this.resetHover, mouseLeaveDelay);
          return;
        }

        this.resetHover();
      };

      onMouseEnter = () => {
        const {mouseLeaveDelay} = this.props;

        if (mouseLeaveDelay) {
          this.resetTimer();
        }

        this.setHover();
      };

      setHover = () => {
        this.setState({isHover: true});
      };

      resetHover = () => {
        this.setState({isHover: false});
      };

      resetTimer = () => {
        if (this.timerId) {
          clearInterval(this.timerId);
          this.timerId = null;
        }
      };

      componentWillUnmount() {
        this.resetTimer();
      }

      render(): Node {
        const {isHover} = this.state;

        const componentProps = {
          ...this.props,
          isHover,
          onMouseEnter: this.onMouseEnter,
          onMouseLeave: this.onMouseLeave,
        };

        return (
          <Component {...componentProps} />
        );
      }
    }
  );

export default withHover;

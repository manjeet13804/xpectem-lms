import React from 'react';
import { CloseIcon, ErrorSvg } from 'components';
import { COLORS, MAIN_CONTAINER_ID } from 'constants/constants';
import { PropTypes } from 'prop-types';
import { Element, scroller } from 'react-scroll';
import { Icon } from 'semantic-ui-react';
import BannerNotificationWrapper from './bannerNotification.style';

const defaultProps = {
  title: '',
  error: '',
  isOpen: false,
  isCloseOnTime: false,
  close: () => null,
};

const propTypes = {
  title: PropTypes.string,
  error: PropTypes.string,
  isOpen: PropTypes.bool,
  isCloseOnTime: PropTypes.bool,
  close: PropTypes.func,
};

const element = 'banner_notification';

class BannerNotification extends React.Component {
  componentDidMount() {
    const { isScrollMount, close, noAutoClose } = this.props;

    if (isScrollMount) {
      scroller.scrollTo(element, {
        duration: 500,
        smooth: true,
        containerId: MAIN_CONTAINER_ID,
        offset: -200,
      });

      if (!noAutoClose) {
        this.timeout = setTimeout(close, 5000);
      }
    }
  }

  componentWillUnmount() {
    const { close } = this.props;
    clearTimeout(this.timeout);
    close();
  }

  render() {
    const {
      error,
      title,
      close,
    } = this.props;

    return (
      <React.Fragment>
        <BannerNotificationWrapper>
          <Element name={element} className={error ? 'block block-red' : 'block block-green'}>
            <div className="info">
              {error ? (<ErrorSvg />) : (<Icon name="check square" size="large" />)}
              <div className="title">
                {title}
              </div>
            </div>
            <div
              className="close"
              onClick={close}
              role="button"
              tabIndex={-1}
            >
              <CloseIcon
                fill={COLORS.white}
                width="28"
                height="28"
              />
            </div>
          </Element>
        </BannerNotificationWrapper>
      </React.Fragment>
    );
  }
}

BannerNotification.propTypes = propTypes;
BannerNotification.defaultProps = defaultProps;

export default BannerNotification;

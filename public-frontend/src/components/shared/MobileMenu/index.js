// @flow
import React, { Node, Component, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { TERM_SHARED } from 'localise';
import { MenuIcon } from 'components';
import { bemlds } from 'utils';
import './styles.scss';

const { menu } = TERM_SHARED;

const b = bemlds('mobile-menu');

const DefaultProps = {
  className: '',
};

type PropType = {
  className?: string,
  buttons: object[]
};

class MobileMenu extends Component<PropType> {
  constructor(props: PropType) {
    super(props);
    this.mobileMenu = React.createRef();
    this.state = { isOpen: false };
  }

  openMenu = () => {
    const { isOpen } = this.state;
    this.setState({isOpen: !isOpen});
  };

  closeMenu = () => {
    this.setState({isOpen: false});
  };

  closeHandler = (e: SyntheticEvent) => {
    if (e.target === this.mobileMenu.current) {
      this.closeMenu();
    }
  };

  render(): Node {
    const { isOpen } = this.state;
    const { className, buttons } = this.props;
    return (
      <section className={b({ mix: className })}>
        <button className={b('menu-button')} type="button" onClick={this.openMenu}>
          <MenuIcon className={b('icon')} />
        </button>
        {isOpen && (
          <div
            className={b('popup-wrap')}
            onClick={this.closeHandler}
            role="button"
            tabIndex="0"
            ref={this.mobileMenu}
          >
            <div className={b('menu-block')}>
              <span className={b('header')}>{menu}</span>
              <nav className={b('nav')}>
                {
                  buttons.map(({ text, link }: object): Node => (
                    <Link className={b('link')} key={`mobile-${text}`} to={link}>{text}</Link>
                  ))
                }
              </nav>
            </div>
          </div>
        )
        }
      </section>
    );
  }
}

MobileMenu.defaultProps = DefaultProps;

export default MobileMenu;

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import clone from 'clone';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import { ArrowUp } from 'components';
import Scrollbars from 'components/utility/customScrollBar.js';
import Menu from 'components/uielements/menu';
import IntlMessages from 'components/utility/intlMessages';
import appActions from 'redux/app/actions';
import Logo from 'components/utility/logo';
import SidebarWrapper from './sidebar.style';
import options from './options';

const { SubMenu } = Menu;
const { Sider } = Layout;

const {
  toggleOpenDrawer,
  changeOpenKeys,
  changeCurrent,
  toggleCollapsed,
} = appActions;

const stripTrailingSlash = (str) => {
  if (str.substr(-1) === '/') {
    return str.substr(0, str.length - 1);
  }

  return str;
};

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
  }

  componentWillMount() {
    const { location: { pathname } } = window;
    const { changeSection } = this.props;
    const path = pathname.toLowerCase();

    if (path.startsWith('/start')) {
      changeSection(['start']);
    }

    if (path.startsWith('/dashboard/assets')) {
      changeSection(['assets']);
    }

    if (path.startsWith('/dashboard/all_events')) {
      changeSection(['all_events']);
    }

    if (path.startsWith('/dashboard/feed_news')) {
      changeSection(['feed_news']);
    }

    if (path.startsWith('/dashboard/feed_news_sources') || path.startsWith('/dashboard/feed_news_source_types')) {
      changeSection(['feed_news_sources']);
    }

    if (path.startsWith('/dashboard/news')) {
      changeSection(['news']);
    }

    if (path.startsWith('/dashboard/events')) {
      changeSection(['events']);
    }

    if (path.startsWith('/dashboard/news_sources') || path.startsWith('/dashboard/news_source_types')) {
      changeSection(['news_sources']);
    }

    if (path.startsWith('/dashboard/blog')) {
      changeSection(['blog']);
    }

    if (path.startsWith('/dashboard/exchanges')) {
      changeSection(['exchanges']);
    }
  }

  onOpenChange(newOpenKeys) {
    const { app, changeKeys } = this.props;
    const latestOpenKey = newOpenKeys.find(
      key => !(app.openKeys.indexOf(key) > -1),
    );
    const latestCloseKey = app.openKeys.find(
      key => !(newOpenKeys.indexOf(key) > -1),
    );
    let nextOpenKeys = [];

    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }

    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    changeKeys(nextOpenKeys);
  }

  getAncestorKeys = (key) => {
    const map = {
      sub3: ['sub2'],
    };

    return map[key] || [];
  };

  getMenuItem = ({ singleOption, submenuStyle, submenuColor }) => {
    const {
      key,
      label,
      children,
      action,
    } = singleOption;
    const url = stripTrailingSlash(this.props.url);
    if (children) {
      return (
        <SubMenu
          key={key}
          title={(
            <Fragment>
              <span className="isoMenuHolder" style={submenuColor}>
                <span className="nav-text">
                  <IntlMessages id={label} />
                </span>
              </span>
              <ArrowUp className="arrow-icon" />
            </Fragment>
          )}
        >
          {children.map((child) => {
            const linkTo = child.withoutDashboard
              ? `/${child.key}`
              : `${url}/${child.key}`;

            return (
              <Menu.Item style={submenuStyle} key={child.key}>
                <Link
                  style={submenuColor}
                  to={linkTo}
                >
                  <IntlMessages id={child.label} />
                </Link>
              </Menu.Item>
            );
          })}
        </SubMenu>
      );
    }

    return (
      <Menu.Item key={key}>
        <Link
          to={`${url}/${key}`}
          onClick={() => action && action()}
        >
          <span className="isoMenuHolder" style={submenuColor}>
            <span className="nav-text">
              <IntlMessages id={label} />
            </span>
          </span>
        </Link>
      </Menu.Item>
    );
  };

  handleClick(e) {
    const { changeSection, changeKeys } = this.props;
    const { keyPath } = e;
    if (keyPath.length === 1) {
      changeKeys([]);
    }
    changeSection([e.key]);
  }

  render() {
    const {
      app,
      customizedTheme,
      height,
      toggleMenu,
      user,
    } = this.props;
    const { location: { pathname } } = window;
    const path = pathname.toLowerCase();
    const mainPath = path.split('/')[1];
    const secondPath = path.split('/')[2];
    const currentPath = secondPath ? `${mainPath}/${secondPath}` : mainPath;
    const { burger } = app;
    const collapsed = clone(app.collapsed) && !clone(app.openDrawer);
    const mode = collapsed ? 'vertical' : 'inline';
    const styling = {
      backgroundColor: customizedTheme.backgroundColor,
    };
    const submenuStyle = {
      backgroundColor: '#ffffff',
      color: customizedTheme.textColor,
    };
    const submenuColor = {
      color: customizedTheme.textColor,
    };
    return (
      <SidebarWrapper>
        <div
          className={burger ? 'veil' : null}
          onClick={(event) => {
            toggleMenu();
            event.preventDefault();
          }}
        />
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={240}
          className="isomorphicSidebar"
          style={styling}
        >
          <Logo />
          <Scrollbars style={{ height: height - 70 }}>
            <Menu
              onClick={this.handleClick}
              theme="dark"
              className="isoDashboardMenu"
              mode={mode}
              openKeys={collapsed ? [] : app.openKeys}
              selectedKeys={[currentPath]}
              onOpenChange={this.onOpenChange}
            >
              {
                options(user).map(singleOption => this.getMenuItem(
                  { submenuStyle, submenuColor, singleOption },
                ))
              }
            </Menu>
          </Scrollbars>
        </Sider>
      </SidebarWrapper>
    );
  }
}

Sidebar.defaultProps = {
  app: {},
  customizedTheme: {},
  height: null,
  changeSection: null,
  toggleMenu: null,
  toggleDrawer: null,
  changeKeys: null,
  user: {},
};

Sidebar.propTypes = {
  app: PropTypes.shape({}),
  customizedTheme: PropTypes.shape({}),
  height: PropTypes.number,
  changeSection: PropTypes.func,
  toggleMenu: PropTypes.func,
  toggleDrawer: PropTypes.func,
  changeKeys: PropTypes.func,
  user: PropTypes.shape({}),
};

export default connect(
  state => ({
    app: state.App,
    customizedTheme: state.ThemeSwitcher.sidebarTheme,
    height: state.App.height,
  }),
  {
    toggleDrawer: toggleOpenDrawer,
    changeKeys: changeOpenKeys,
    changeSection: changeCurrent,
    toggleMenu: toggleCollapsed,
  },
)(Sidebar);

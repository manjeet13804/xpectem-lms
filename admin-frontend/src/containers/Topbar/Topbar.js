import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import appActions from 'redux/app/actions';
import logoMobileImg from 'assets/images/xpectum.png';
import { COLORS } from 'constants/constants';
import TopbarUser from './topbarUser';
import TopbarWrapper from './topbar.style';
import MenuNotice from './MenuNotice';

const { Header } = Layout;
const { toggleCollapsed } = appActions;

class Topbar extends Component {
  render() {
    const { toggleCollapsed, customizedTheme, locale, collapsed, openDrawer } = this.props;
    const isCollapsed = collapsed && !openDrawer;
    const styling = {
      backgroundColor: COLORS.white,
      width: '100%',
      height: 75,
    };
    return (
      <TopbarWrapper>
        <Header
          style={styling}
          className={
            isCollapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
          }
        >
          <div className="isoLeft">
            <button
              className={
                isCollapsed ? 'triggerBtn menuCollapsed' : 'triggerBtn menuOpen'
              }
              style={{ color: customizedTheme.textColor }}
              onClick={toggleCollapsed}
            />
          </div>
          <div className="isoCenter">
            <img className="isoCenter__logo" src={logoMobileImg} alt="logoMobile" />
          </div>
          <ul className="isoRight">
            <li>
              <MenuNotice />
            </li>
            <li
              onClick={() => this.setState({ selectedItem: 'user' })}
              className="isoUser"
            >
              <TopbarUser locale={locale} />
            </li>
          </ul>
        </Header>
      </TopbarWrapper>
    );
  }
}

export default connect(
  state => ({
    ...state.App,
    locale: state.LanguageSwitcher.language.locale,
    customizedTheme: state.ThemeSwitcher.topbarTheme,
  }),
  { toggleCollapsed },
)(Topbar);

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Layout, LocaleProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import { MiniFooter } from 'components';
import { Debounce } from 'react-throttle';
import WindowResizeListener from 'react-window-size-listener';
import { MAIN_CONTAINER_ID } from 'constants/constants';
import { ThemeProvider } from 'styled-components';
import userActions from '../../redux/user/actions';
import authAction from '../../redux/auth/actions';
import appActions from '../../redux/app/actions';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';
import AppRouter from './AppRouter';
import { AppLocale } from '../../dashApp';
import themes from '../../settings/themes';
import AppHolder from './commonStyle';
import 'semantic-ui-css/semantic.min.css';
import './global.css';

const { Content } = Layout;
const { logout, getFullInfoUser } = authAction;
const { toggleAll } = appActions;
const { addUserNotification } = userActions;

/* eslint-disable import/no-mutable-exports, import/prefer-default-export */
export let storeLink;
/* eslint-enable import/no-mutable-exports, import/prefer-default-export */

export const App = (props) => {
  const { url } = props.match;
  const {
    locale,
    selectedTheme,
    height,
    auth,
    getUserInfo,
    addUserNotification,
  } = props;
  const { role, id, user } = auth;
  useEffect(() => {
    if (id) {
      getUserInfo();
      storeLink = addUserNotification;
    }
  }, [id]);
  const currentAppLocale = AppLocale[locale];
  const appHeight = window.innerHeight;
  return (
    <LocaleProvider locale={currentAppLocale.antd}>
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <ThemeProvider theme={themes[selectedTheme]}>
          <AppHolder>
            <Layout style={{ height: appHeight }}>
              <Debounce time="1000" handler="onResize">
                <WindowResizeListener
                  onResize={windowSize => props.toggleAll(
                    windowSize.windowWidth,
                    windowSize.windowHeight,
                  )
                  }
                />
              </Debounce>
              <Topbar url={url} />
              <Layout style={{ flexDirection: 'row', overflowX: 'hidden' }}>
                <Sidebar url={url} user={user} />
                <Layout
                  className="isoContentMainLayout"
                  style={{
                    height,
                  }}
                  id={MAIN_CONTAINER_ID}
                >
                  <Content
                    className="isomorphicContent"
                  >
                    <AppRouter
                      basename="/admin"
                      className="routerStyles"
                      style={{
                        
                      }}
                      role={role}
                    />
                    <MiniFooter />
                  </Content>
                </Layout>
              </Layout>
            </Layout>
          </AppHolder>
        </ThemeProvider>
      </IntlProvider>
    </LocaleProvider>
  );
};

export default connect(
  state => ({
    auth: state.Auth,
    locale: state.LanguageSwitcher.language.locale,
    selectedTheme: state.ThemeSwitcher.changeThemes.themeName,
    height: state.App.height,
  }),
  {
    logout,
    toggleAll,
    getUserInfo: getFullInfoUser,
    addUserNotification,
  },
)(App);

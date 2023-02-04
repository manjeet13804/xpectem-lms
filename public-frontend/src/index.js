// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import {actionCurrentUser, actionAppCanRender} from 'redux/actions';
import configureStore from './store';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';

/* eslint-disable import/no-mutable-exports, import/prefer-default-export */
export let storeLink;
/* eslint-enable import/no-mutable-exports, import/prefer-default-export */

configureStore({}).then((store: object) => {
  storeLink = store;
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    store.dispatch(actionCurrentUser(token));
  } else {
    store.dispatch(actionAppCanRender());
  }
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
});

serviceWorker.unregister();

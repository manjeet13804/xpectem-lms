// @flow
import React from 'react';
import type { Node } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './router';
import 'typeface-roboto'

const App = (): Node => (
  <Router basename="/public">
    <Routes />
  </Router>
);

export default App;

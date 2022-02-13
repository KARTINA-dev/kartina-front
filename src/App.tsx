import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { history, store } from '../store';

export const App: React.FC = () => (
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <Main />
      </Router>
    </Provider>
  </React.StrictMode>
);

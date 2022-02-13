import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Main } from './pages/Main/Main';

import { store } from './store';

const App: React.VFC = () => (
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Main />
      </Router>
    </Provider>
  </React.StrictMode>
);

export default App;

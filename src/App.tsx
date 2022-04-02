import React from 'react';
import { Provider } from 'react-redux';

import { Root } from './pages/Root';
import { store } from './store';
import './flow';

const App: React.VFC = () => (
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>
);

export default App;

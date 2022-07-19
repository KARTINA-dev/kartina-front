import React from 'react';
import { Provider } from 'react-redux';

import { Root } from './pages/Root';
import { store } from './store';
import { ThemeProvider } from './helpers/Theme/ThemeProvider';

import './flow';

const App: React.FC = () => (
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <Root />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

export default App;

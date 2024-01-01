import React from 'react';
import { Provider } from 'react-redux';
import { store } from './Store';

const GlobalProvider: any = ({children}: any) => {
  return (
    <Provider
      store={store}>
      {children}
    </Provider>
  );
};

export default GlobalProvider;

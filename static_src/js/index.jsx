// js/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

import Root from './containers/Root';


const INITIAL_STATE = {
  projects: {
    objects: window.__PROJECTS_INITIAL_STATE__,
    meta: {
      at: new Date().getTime()
    }
  }
};

const store = configureStore(INITIAL_STATE);


ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);
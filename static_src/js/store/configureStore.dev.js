// js/store/configureStore.dev.js
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import DevTools from '../containers/DevTools';

import appReducer from './appReducer';


const finalCreateStore = compose(
  applyMiddleware(thunkMiddleware),
  DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(appReducer, initialState);
}
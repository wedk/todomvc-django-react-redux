// js/actions/AppActions.js
import ActionTypes from '../constants/AppActionTypes';


export function dismissFlash() {
  return { type: ActionTypes.flash.dismiss };
}
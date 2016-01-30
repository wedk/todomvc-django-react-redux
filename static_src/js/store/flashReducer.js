// js/store/flashReducer.js
import types from '../constants/AppActionTypes';


const FAILURE_SUFFIX = '/failure';
const INITIAL_STATE = {};

function flash(state = INITIAL_STATE, action) {

  switch (action.type) {

    case types.flash.dismiss:
      return INITIAL_STATE;

    default:

      if (!action.hasOwnProperty('flash')) {
        return state;
      }

      if (action.type.endsWith(FAILURE_SUFFIX)) {
        return {
          message: action.flash
        };
      }

      return state;

  }

}


export default flash;
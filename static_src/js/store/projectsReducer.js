// js/store/projectsReducer.js
import { combineReducers } from 'redux';
import metaEnhancer from './metaEnhancer';
import types from '../constants/ProjectActionTypes';


function objects(state = [], action) {
  switch (action.type) {

    case types.all.success:
      return action.projects;

    case types.create.success:
      return state.concat(action.project);

    case types.update.success:
      return state.map(project => project.id === action.project.id
                                  ? action.project
                                  : project);

    case types.destroy.success:
      return state.filter(project => project.id !== action.id);

    default:
      return state;
  }
}


const INITIAL_CREATING = { $pending: false, name: null };


function creating(state = INITIAL_CREATING, action) {
  switch (action.type) {

    case types.create.request:
      return { $pending: true, name: action.name };

    case types.create.success:
      return INITIAL_CREATING;

    case types.create.failure:
      return { $pending: false, name: state.name };

    default:
      return state;
  }
}


function pending(state = [], action) {
  switch (action.type) {

    case types.update.request:
      return state.concat({ id: action.id, $operation: action.$operation, $cause: 'updating', name: action.name });

    case types.destroy.request:
      return state.concat({ id: action.id, $operation: action.$operation, $cause: 'deleting' });

    case types.update.success:
    case types.update.failure:
    case types.destroy.success:
    case types.destroy.failure:
      return state.filter(p => p.$operation !== action.$operation);

    default:
      return state;
  }
}


function loading(state = false, action) {
  switch (action.type) {

    case types.all.request:
      return true;

    case types.all.success:
    case types.all.failure:
      return false;

    default:
      return state;
  }
}


function at(state = 0, action) {
  switch (action.type) {

    case types.all.success:
      return new Date().getTime();

    default:
      return state;
  }
}


const meta = combineReducers({
  loading,
  creating,
  pending,
  at
});


const projects = metaEnhancer(objects, meta);


export default projects;
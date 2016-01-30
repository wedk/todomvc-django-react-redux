// js/store/tasksReducer.js
import { combineReducers } from 'redux';
import metaEnhancer from './metaEnhancer';
import types from '../constants/TaskActionTypes';
import projectTypes from '../constants/ProjectActionTypes';


function projectTasks(state = [], action) {
  switch (action.type) {

    case types.all.success:
      return action.tasks;

    case types.create.success:
      return state.concat(action.task);

    case types.update.success:
    case types.toggle.success:
      return state.map(task => task.id === action.task.id ? action.task : task);

    case types.toggle_all.success:
      return state.map(task => action.ids.indexOf(task.id) == -1
                               ? task
                               : { ...task, completed: action.completed });

    case types.clear_completed.success:
      return state.filter(task => action.ids.indexOf(task.id) == -1);

    case types.destroy.success:
      return state.filter(task => task.id !== action.id);

    default:
      return state;
  }
}


function objects(state = {}, action) {
  switch (action.type) {

    case types.all.success:
    case types.create.success:
    case types.update.success:
    case types.toggle.success:
    case types.toggle_all.success:
    case types.clear_completed.success:
    case types.destroy.success:
      return {
        ...state,
        [action.projectId]: projectTasks(state[action.projectId], action)
      };

    case projectTypes.destroy.success:
      return Object.keys(state).filter(key => key != action.id).reduce((memo, key) => {
        memo[key] = state[key];
        return memo;
      }, {});

    default:
      return state;
  }
}


const INITIAL_CREATING = { $pending: false, title: null };


function creating(state = INITIAL_CREATING, action) {
  switch (action.type) {

    case types.create.request:
      return { $pending: true, title: action.title };

    case types.create.success:
      return INITIAL_CREATING;

    case types.create.failure:
      return { $pending: false, title: state.title };

    default:
      return state;
  }
}


function pending(state = [], action) {

  switch (action.type) {

    case types.update.request:
      return state.concat({
        id: action.id,
        $operation: action.$operation,
        $cause: 'updating',
        title: action.title
      });

    case types.toggle.request:
      return state.concat({
        id: action.id,
        $operation: action.$operation,
        $cause: 'updating',
        completed: action.completed
      });

    case types.toggle_all.request:
      return state.concat(
        action.$objects[action.projectId].reduce((memo, task) => {
          if (task.completed !== action.completed) {
            memo.push({ id: task.id, $operation: action.$operation, $cause: 'updating', completed: action.completed });
          }
          return memo;
        }, [])
      );

    case types.destroy.request:
      return state.concat({ id: action.id, $operation: action.$operation, $cause: 'deleting' });

    case types.clear_completed.request:
      return state.concat(
        action.$objects[action.projectId].reduce((memo, task) => {
          if (task.completed) {
            memo.push({ id: task.id, $operation: action.$operation, $cause: 'deleting' });
          }
          return memo;
        }, [])
      );

    case types.update.success:
    case types.update.failure:
    case types.destroy.success:
    case types.destroy.failure:
    case types.toggle.success:
    case types.toggle.failure:
    case types.toggle_all.success:
    case types.toggle_all.failure:
    case types.clear_completed.success:
    case types.clear_completed.failure:
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


const tasks = metaEnhancer(objects, meta);


export default tasks;
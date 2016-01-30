// js/store/appReducer.js
import { combineReducers } from 'redux';

import flash from './flashReducer';
import projects from './projectsReducer';
import tasks from './tasksReducer';


const appReducer = combineReducers({
  flash,
  projects,
  tasks
});


export default appReducer;
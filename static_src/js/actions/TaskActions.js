// js/actions/Actions.js
import ActionTypes from '../constants/TaskActionTypes';
import Api, { isFresh } from '../utils/AsyncActionsUtils';


export function fetchTasks(projectId) {
  return (dispatch, getState) => {

    const { objects, meta } = getState().tasks;

    if (objects[projectId] && objects[projectId].length && isFresh(meta.at)) {
      return;
    }

    Api(dispatch, ActionTypes.all)
      .get(`/api/projects/${projectId}/tasks/`, tasks => ({ projectId, tasks }));

  }
}


export function createTask(projectId, title) {
  return (dispatch, getState) => {

    Api(dispatch, ActionTypes.create)
      .create(`/api/projects/${projectId}/tasks/`, { title }, task => ({ projectId, task }));

  }
}


export function updateTask(projectId, id, title) {
  return (dispatch, getState) => {

    Api(dispatch, ActionTypes.update, { id })
      .update(`/api/projects/${projectId}/tasks/${id}/`, { title }, task => ({ projectId, task }));

  }
}


export function toggleTask(projectId, id, completed) {
  return (dispatch, getState) => {

    Api(dispatch, ActionTypes.toggle, { id })
      .update(`/api/projects/${projectId}/tasks/${id}/`, { completed }, task => ({ projectId, task }));

  }
}


export function toggleAllTasks(projectId, completed) {
  return (dispatch, getState) => {

    Api(dispatch, ActionTypes.toggle_all, { projectId })
      .update(`/api/projects/${projectId}/tasks/toggle_all/`, { completed }, data => data);

  }
}


export function clearCompleted(projectId) {
  return (dispatch, getState) => {

    Api(dispatch, ActionTypes.clear_completed, { projectId })
      .destroy(`/api/projects/${projectId}/tasks/clear_completed/`, data => data);

  }
}


export function destroyTask(projectId, id) {
  return (dispatch, getState) => {

    Api(dispatch, ActionTypes.destroy, { id })
      .destroy(`/api/projects/${projectId}/tasks/${id}/`, () => ({ projectId, id }));

  }
}
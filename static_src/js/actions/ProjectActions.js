// js/actions/ProjectActions.js
import ActionTypes from '../constants/ProjectActionTypes';
import Api, { isFresh } from '../utils/AsyncActionsUtils';


export function fetchProjects() {
  return (dispatch, getState) => {

    const { objects, meta } = getState().projects;

    if (objects.length && isFresh(meta.at)) {
      return;
    }

    Api(dispatch, ActionTypes.all)
      .get('/api/projects/', projects => ({ projects }));

  }
}


export function createProject(name) {
  return (dispatch, getState) => {

    const flash = 'An error occurred during the creation of the project. Please try again.';

    Api(dispatch, ActionTypes.create, { flash })
      .create('/api/projects/', { name }, project => ({ project }));

  }
}


export function updateProject(id, name) {
  return (dispatch, getState) => {

    Api(dispatch, ActionTypes.update, { id })
      .update(`/api/projects/${id}/`, { name }, project => ({ project }));

  }
}


export function destroyProject(id) {
  return (dispatch, getState) => {

    Api(dispatch, ActionTypes.destroy, { id })
      .destroy(`/api/projects/${id}/`, () => ({ id }));

  }
}
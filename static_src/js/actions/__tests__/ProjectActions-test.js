// js/actions/__tests__/ProjectActions-test.js
jest.dontMock('../ProjectActions');
jest.dontMock('../../constants/ProjectActionTypes');
jest.dontMock('../../utils/ActionTypesUtils');
jest.dontMock('../../utils/AsyncActionsUtils');


describe('ProjectActions', () => {

  let types, fetchJson, then, katch, dispatch, getState;


  beforeEach(() => {
    types = require('../../constants/ProjectActionTypes').default;
    fetchJson = require('../../utils/ApiUtils').fetchJson;

    then = jest.genMockFunction().mockReturnThis();
    katch = jest.genMockFunction().mockReturnThis();
    fetchJson.mockImplementation(() => {
      return {
        then: then,
        catch: katch
      };
    });
    dispatch = jest.genMockFunction();
    getState = jest.genMockFunction();
  });


  it('should fetch projects', () => {

    getState = jest.genMockFunction().mockImplementation(() => {
      return {
        projects: {
          objects: [],
          meta: {
            at: 0
          }
        }
      }
    });

    const ProjectActions = require('../ProjectActions');
    ProjectActions.fetchProjects()(dispatch, getState);

    // request
    expect(fetchJson).toBeCalledWith('GET', '/api/projects/', undefined);
    expect(dispatch).toBeCalledWith({
      type: types.all.request,
      $operation: jasmine.any(Number)
    });
    const $operation = dispatch.mock.calls[0][0].$operation;

    // success
    then.mock.calls[0][0]([{ id: 9, name: 'p1' }, { id: 10, name: 'p2' }]); // simulate success
    expect(dispatch).toBeCalledWith({
      type: types.all.success,
      $operation: $operation,
      projects: [
        { id: 9, name: 'p1' },
        { id: 10, name: 'p2' }
      ]
    });

    // failure
    const err = new Error();
    katch.mock.calls[0][0](err); // simulate failure
    expect(dispatch).toBeCalledWith({
      type: types.all.failure,
      $operation: $operation,
      error: err,
      flash: jasmine.any(String)
    });

    expect(getState.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls.length).toBe(3);
  });


  it('should not fetch projects if state is fresh and not empty', () => {

    getState = jest.genMockFunction().mockImplementation(() => {
      return {
        projects: {
          objects: [{ id: 9, name: 'p1' }, { id: 10, name: 'p2' }],
          meta: {
            at: new Date().getTime() - (30 * 1000) // 30 seconds ago
          }
        }
      }
    });

    const ProjectActions = require('../ProjectActions');
    ProjectActions.fetchProjects()(dispatch, getState);

    expect(getState.mock.calls.length).toBe(1);
    expect(fetchJson).not.toBeCalled();
    expect(then).not.toBeCalled();
    expect(katch).not.toBeCalled();
    expect(dispatch).not.toBeCalled();
  });


  it('should fetch projects if state is empty (even if fresh)', () => {

    getState = jest.genMockFunction().mockImplementation(() => {
      return {
        projects: {
          objects: [],
          meta: {
            at: new Date().getTime() - (30 * 1000) // 30 seconds ago
          }
        }
      }
    });

    const ProjectActions = require('../ProjectActions');
    ProjectActions.fetchProjects()(dispatch, getState);

    expect(getState.mock.calls.length).toBe(1);
    expect(fetchJson.mock.calls.length).toBe(1);
  });


  it('should create project', () => {
    const ProjectActions = require('../ProjectActions');
    ProjectActions.createProject('p1')(dispatch, getState);

    // request
    expect(fetchJson).toBeCalledWith('POST', '/api/projects/', { name: 'p1' });
    expect(dispatch).toBeCalledWith({
      type: types.create.request,
      $operation: jasmine.any(Number),
      name: 'p1'
    });
    const $operation = dispatch.mock.calls[0][0].$operation;

    // success
    then.mock.calls[0][0]({ id: 9, name: 'p1' }); // simulate success
    expect(dispatch).toBeCalledWith({
      type: types.create.success,
      $operation: $operation,
      project: { id: 9, name: 'p1' }
    });

    // failure
    const err = new Error();
    katch.mock.calls[0][0](err); // simulate failure
    expect(dispatch).toBeCalledWith({
      type: types.create.failure,
      $operation: $operation,
      error: err,
      flash: jasmine.any(String)
    });

    expect(dispatch.mock.calls.length).toBe(3);
  });


  it('should update project', () => {
    const ProjectActions = require('../ProjectActions');
    ProjectActions.updateProject(9, 'p1')(dispatch, getState);

    // request
    expect(fetchJson).toBeCalledWith('PATCH', '/api/projects/9/', { name: 'p1' });
    expect(dispatch).toBeCalledWith({
      type: types.update.request,
      $operation: jasmine.any(Number),
      id: 9,
      name: 'p1'
    });
    const $operation = dispatch.mock.calls[0][0].$operation;

    // success
    then.mock.calls[0][0]({ id: 9, name: 'p1' }); // simulate success
    expect(dispatch).toBeCalledWith({
      type: types.update.success,
      $operation: $operation,
      id: 9,
      project: { id: 9, name: 'p1' }
    });

    // failure
    const err = new Error();
    katch.mock.calls[0][0](err); // simulate failure
    expect(dispatch).toBeCalledWith({
      type: types.update.failure,
      $operation: $operation,
      error: err,
      flash: jasmine.any(String),
      id: 9
    });

    expect(dispatch.mock.calls.length).toBe(3);
  });


  it('should destroy project', () => {
    const ProjectActions = require('../ProjectActions');
    ProjectActions.destroyProject(9)(dispatch, getState);

    // request
    expect(fetchJson).toBeCalledWith('DELETE', '/api/projects/9/', undefined);
    expect(dispatch).toBeCalledWith({
      type: types.destroy.request,
      $operation: jasmine.any(Number),
      id: 9
    });
    const $operation = dispatch.mock.calls[0][0].$operation;

    // success
    then.mock.calls[0][0](); // simulate success
    expect(dispatch).toBeCalledWith({
      type: types.destroy.success,
      $operation: $operation,
      id: 9
    });

    // failure
    const err = new Error();
    katch.mock.calls[0][0](err); // simulate failure
    expect(dispatch).toBeCalledWith({
      type: types.destroy.failure,
      $operation: $operation,
      error: err,
      flash: jasmine.any(String),
      id: 9
    });

    expect(dispatch.mock.calls.length).toBe(3);
  });

});
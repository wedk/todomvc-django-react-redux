// js/actions/__tests__/TaskActions-test.js
jest.dontMock('../TaskActions');
jest.dontMock('../../constants/TaskActionTypes');
jest.dontMock('../../utils/ActionTypesUtils');
jest.dontMock('../../utils/AsyncActionsUtils');


describe('TaskActions', () => {

  let types, fetchJson, then, katch, dispatch, getState;


  beforeEach(() => {
    types = require('../../constants/TaskActionTypes').default;
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


  it('should fetch tasks', () => {

    getState = jest.genMockFunction().mockImplementation(() => {
      return {
        tasks: {
          objects: {},
          meta: {
            at: 0
          }
        }
      }
    });

    const TaskActions = require('../TaskActions');
    TaskActions.fetchTasks(9)(dispatch, getState);

    // request
    expect(fetchJson).toBeCalledWith('GET', '/api/projects/9/tasks/', undefined);
    expect(dispatch).toBeCalledWith({
      type: types.all.request,
      $operation: jasmine.any(Number)
    });
    const $operation = dispatch.mock.calls[0][0].$operation;

    // success
    then.mock.calls[0][0]([ // simulate success
      { id: 1, title: 't1', completed: false },
      { id: 2, name: 't2', completed: true }
    ]);
    expect(dispatch).toBeCalledWith({
      type: types.all.success,
      $operation: $operation,
      projectId: 9,
      tasks: [
        { id: 1, title: 't1', completed: false },
        { id: 2, name: 't2', completed: true }
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


  it('should not fetch tasks if state is fresh and not empty', () => {

    getState = jest.genMockFunction().mockImplementation(() => {
      return {
        tasks: {
          objects: {
            9: [{ id: 1, title: 't1', completed: false }, { id: 2, name: 't2', completed: true }]
          },
          meta: {
            at: new Date().getTime() - (30 * 1000) // 30 seconds ago
          }
        }
      }
    });

    const TaskActions = require('../TaskActions');
    TaskActions.fetchTasks(9)(dispatch, getState);

    expect(getState.mock.calls.length).toBe(1);
    expect(fetchJson).not.toBeCalled();
    expect(then).not.toBeCalled();
    expect(katch).not.toBeCalled();
    expect(dispatch).not.toBeCalled();
  });


  it('should fetch tasks if state is empty (even if fresh)', () => {

    getState = jest.genMockFunction().mockImplementation(() => {
      return {
        tasks: {
          objects: {
            9: []
          },
          meta: {
            at: new Date().getTime() - (30 * 1000) // 30 seconds ago
          }
        }
      }
    });

    const TaskActions = require('../TaskActions');
    TaskActions.fetchTasks(9)(dispatch, getState);

    expect(getState.mock.calls.length).toBe(1);
    expect(fetchJson.mock.calls.length).toBe(1);
  });


  it('should create task', () => {
    const TaskActions = require('../TaskActions');
    TaskActions.createTask(9, 't1')(dispatch, getState);

    // request
    expect(fetchJson).toBeCalledWith('POST', '/api/projects/9/tasks/', { title: 't1' });
    expect(dispatch).toBeCalledWith({
      type: types.create.request,
      $operation: jasmine.any(Number),
      title: 't1'
    });
    const $operation = dispatch.mock.calls[0][0].$operation;

    // success
    then.mock.calls[0][0]({ id: 1, title: 't1', completed: false }); // simulate success
    expect(dispatch).toBeCalledWith({
      type: types.create.success,
      $operation: $operation,
      projectId: 9,
      task: { id: 1, title: 't1', completed: false }
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


  it('should update task', () => {
    const TaskActions = require('../TaskActions');
    TaskActions.updateTask(9, 1, 't1')(dispatch, getState);

    // request
    expect(fetchJson).toBeCalledWith('PATCH', '/api/projects/9/tasks/1/', { title: 't1' });
    expect(dispatch).toBeCalledWith({
      type: types.update.request,
      $operation: jasmine.any(Number),
      id: 1,
      title: 't1'
    });
    const $operation = dispatch.mock.calls[0][0].$operation;

    // success
    then.mock.calls[0][0]({ id: 1, title: 't1', completed: false }); // simulate success
    expect(dispatch).toBeCalledWith({
      type: types.update.success,
      $operation: $operation,
      projectId: 9,
      id: 1,
      task: { id: 1, title: 't1', completed: false }
    });

    // failure
    const err = new Error();
    katch.mock.calls[0][0](err); // simulate failure
    expect(dispatch).toBeCalledWith({
      type: types.update.failure,
      $operation: $operation,
      error: err,
      flash: jasmine.any(String),
      id: 1
    });

    expect(dispatch.mock.calls.length).toBe(3);
  });


  it('should toggle task', () => {
    const TaskActions = require('../TaskActions');
    TaskActions.toggleTask(9, 1, true)(dispatch, getState);

    // request
    expect(fetchJson).toBeCalledWith('PATCH', '/api/projects/9/tasks/1/', { completed: true });
    expect(dispatch).toBeCalledWith({
      type: types.toggle.request,
      $operation: jasmine.any(Number),
      id: 1,
      completed: true
    });
    const $operation = dispatch.mock.calls[0][0].$operation;

    // success
    then.mock.calls[0][0]({ id: 1, title: 't1', completed: true }); // simulate success
    expect(dispatch).toBeCalledWith({
      type: types.toggle.success,
      $operation: $operation,
      projectId: 9,
      id: 1,
      task: { id: 1, title: 't1', completed: true }
    });

    // failure
    const err = new Error();
    katch.mock.calls[0][0](err); // simulate failure
    expect(dispatch).toBeCalledWith({
      type: types.toggle.failure,
      $operation: $operation,
      error: err,
      flash: jasmine.any(String),
      id: 1
    });

    expect(dispatch.mock.calls.length).toBe(3);
  });


  it('should toggle all tasks', () => {
    const TaskActions = require('../TaskActions');
    TaskActions.toggleAllTasks(9, true)(dispatch, getState);

    // request
    expect(fetchJson).toBeCalledWith('PATCH', '/api/projects/9/tasks/toggle_all/', { completed: true });
    expect(dispatch).toBeCalledWith({
      type: types.toggle_all.request,
      $operation: jasmine.any(Number),
      projectId: 9,
      completed: true
    });
    const $operation = dispatch.mock.calls[0][0].$operation;

    // success
    then.mock.calls[0][0]({ ids: [1, 2, 3] }); // simulate success
    expect(dispatch).toBeCalledWith({
      type: types.toggle_all.success,
      $operation: $operation,
      projectId: 9,
      ids: [1, 2, 3]
    });

    // failure
    const err = new Error();
    katch.mock.calls[0][0](err); // simulate failure
    expect(dispatch).toBeCalledWith({
      type: types.toggle_all.failure,
      $operation: $operation,
      error: err,
      flash: jasmine.any(String),
      projectId: 9
    });

    expect(dispatch.mock.calls.length).toBe(3);
  });


  it('should clear completed tasks', () => {
    const TaskActions = require('../TaskActions');
    TaskActions.clearCompleted(9)(dispatch, getState);

    // request
    expect(fetchJson).toBeCalledWith('DELETE', '/api/projects/9/tasks/clear_completed/', undefined);
    expect(dispatch).toBeCalledWith({
      type: types.clear_completed.request,
      $operation: jasmine.any(Number),
      projectId: 9
    });
    const $operation = dispatch.mock.calls[0][0].$operation;

    // success
    then.mock.calls[0][0]({ ids: [1, 2, 3] }); // simulate success
    expect(dispatch).toBeCalledWith({
      type: types.clear_completed.success,
      $operation: $operation,
      projectId: 9,
      ids: [1, 2, 3]
    });

    // failure
    const err = new Error();
    katch.mock.calls[0][0](err); // simulate failure
    expect(dispatch).toBeCalledWith({
      type: types.clear_completed.failure,
      $operation: $operation,
      error: err,
      flash: jasmine.any(String),
      projectId: 9
    });

    expect(dispatch.mock.calls.length).toBe(3);
  });


  it('should destroy task', () => {
    const TaskActions = require('../TaskActions');
    TaskActions.destroyTask(9, 1)(dispatch, getState);

    // request
    expect(fetchJson).toBeCalledWith('DELETE', '/api/projects/9/tasks/1/', undefined);
    expect(dispatch).toBeCalledWith({
      type: types.destroy.request,
      $operation: jasmine.any(Number),
      id: 1
    });
    const $operation = dispatch.mock.calls[0][0].$operation;

    // success
    then.mock.calls[0][0](); // simulate success
    expect(dispatch).toBeCalledWith({
      type: types.destroy.success,
      $operation: $operation,
      projectId: 9,
      id: 1
    });

    // failure
    const err = new Error();
    katch.mock.calls[0][0](err); // simulate failure
    expect(dispatch).toBeCalledWith({
      type: types.destroy.failure,
      $operation: $operation,
      error: err,
      flash: jasmine.any(String),
      id: 1
    });

    expect(dispatch.mock.calls.length).toBe(3);
  });

});
// js/store/__tests__/tasksReducer-test.js
jest.autoMockOff();

const types = require('../../constants/TaskActionTypes').default;
const projectTypes = require('../../constants/ProjectActionTypes').default;
const tasksReducer = require('../tasksReducer').default;


describe('tasksReducer', () => {

  it('should have an initial state', () => {
    const action = { type: '__ARBITRARY__' };
    const state = undefined;
    const expectedState = {
      meta: {
        loading: false,
        creating: { $pending: false, title: null },
        pending: [],
        at: 0
      },
      objects: {}
    };
    expect(tasksReducer(state, action)).toEqual(expectedState);
  });


  it('should handle task/all/*', () => {
    const initialState = undefined;
    let action, expectedState;

    // request
    action = {
      type: types.all.request,
      $operation: -9999
    };
    expectedState = {
      meta: {
        loading: true,
        creating: { $pending: false, title: null },
        pending: [],
        at: 0
      },
      objects: {}
    };
    const requestState = tasksReducer(initialState, action);
    expect(requestState).toEqual(expectedState);

    // success
    action = {
      type: types.all.success,
      $operation: -9999,
      projectId: 99,
      tasks: [
        { id: 1, title: 't1', completed: true  },
        { id: 2, title: 't2', completed: false }
      ]
    };
    expectedState = {
      meta: {
        loading: false,
        creating: { $pending: false, title: null },
        pending: [],
        at: jasmine.any(Number)
      },
      objects: {
        99: [
          { id: 1, title: 't1', completed: true  },
          { id: 2, title: 't2', completed: false }
        ]
      }
    };
    const successState = tasksReducer(requestState, action);
    expect(successState).toEqual(expectedState);
    expect(successState.meta.at).toBeGreaterThan(0);

    // failure
    action = {
      type: types.all.failure,
      $operation: -9999,
      flash: 'Something went wrong.',
      error: new Error()
    };
    expectedState = {
      meta: {
        loading: false,
        creating: { $pending: false, title: null },
        pending: [],
        at: 0
      },
      objects: {}
    };
    const failureState = tasksReducer(requestState, action);
    expect(failureState).toEqual(expectedState);
  });


  it('should handle task/create/*', () => {
    const initialState = undefined;
    let action, expectedState;

    // request
    action = {
      type: types.create.request,
      $operation: -9999,
      title: 't1'
    };
    expectedState = {
      meta: {
        loading: false,
        creating: { $pending: true, title: 't1' },
        pending: [],
        at: 0
      },
      objects: {}
    };
    const requestState = tasksReducer(initialState, action);
    expect(requestState).toEqual(expectedState);

    // success
    action = {
      type: types.create.success,
      $operation: -9999,
      projectId: 99,
      task: { id: 1, title: 't1', completed: true  }
    };
    expectedState = {
      meta: {
        loading: false,
        creating: { $pending: false, title: null },
        pending: [],
        at: 0
      },
      objects: {
        99: [
          { id: 1, title: 't1', completed: true  }
        ]
      }
    };
    const successState = tasksReducer(requestState, action);
    expect(successState).toEqual(expectedState);

    // failure
    action = {
      type: types.create.failure,
      $operation: -9999,
      flash: 'Something went wrong.',
      error: new Error()
    };
    expectedState = {
      meta: {
        loading: false,
        creating: { $pending: false, title: 't1' },
        pending: [],
        at: 0
      },
      objects: {}
    };
    const failureState = tasksReducer(requestState, action);
    expect(failureState).toEqual(expectedState);
  });


  it('should handle task/update/*', () => {
    const initialState = {
      meta: {
        loading: false,
        creating: { $pending: false, title: null },
        pending: [],
        at: 1453285495178
      },
      objects: {
        99: [
          { id: 1, title: 't1', completed: true },
          { id: 2, title: 't2', completed: false }
        ]
      }
    };

    let action, expectedState;

    // request
    action = {
      type: types.update.request,
      $operation: -9999,
      id: 2,
      title: 'new t2'
    };
    expectedState = {
      meta: {
        loading: false,
        creating: { $pending: false, title: null },
        pending: [
          { id: 2, title: 'new t2', $operation: -9999, $cause: 'updating' }
        ],
        at: 1453285495178
      },
      objects: {
        99: [
          { id: 1, title: 't1', completed: true },
          { id: 2, title: 't2', completed: false }
        ]
      }
    };
    const requestState = tasksReducer(initialState, action);
    expect(requestState).toEqual(expectedState);

    // success
    action = {
      type: types.update.success,
      $operation: -9999,
      id: 2,
      projectId: 99,
      task: { id: 2, title: 'new t2', completed: false }
    };
    expectedState = {
      meta: {
        loading: false,
        creating: { $pending: false, title: null },
        pending: [],
        at: 1453285495178
      },
      objects: {
        99: [
          { id: 1, title: 't1', completed: true },
          { id: 2, title: 'new t2', completed: false }
        ]
      }
    };
    const successState = tasksReducer(requestState, action);
    expect(successState).toEqual(expectedState);

    // failure
    action = {
      type: types.update.failure,
      $operation: -9999,
      id: 2,
      flash: 'Something went wrong.',
      error: new Error()
    };
    expectedState = {
      meta: {
        loading: false,
        creating: { $pending: false, title: null },
        pending: [],
        at: 1453285495178
      },
      objects: {
        99: [
          { id: 1, title: 't1', completed: true },
          { id: 2, title: 't2', completed: false }
        ]
      }
    };
    const failureState = tasksReducer(requestState, action);
    expect(failureState).toEqual(expectedState);
  });


  it('should handle task/toggle/*', () => {
    const initialState = {
      meta: {
        loading: false,
        creating: { $pending: false, title: null },
        pending: [],
        at: 1453285495178
      },
      objects: {
        99: [
          { id: 1, title: 't1', completed: true },
          { id: 2, title: 't2', completed: false }
        ]
      }
    };

    let action, expectedState;

    // request
    action = {
      type: types.toggle.request,
      $operation: -9999,
      id: 2,
      completed: true
    };
    expectedState = {
      meta: {
        loading: false,
        creating: { $pending: false, title: null },
        pending: [
          { id: 2, completed: true, $operation: -9999, $cause: 'updating' }
        ],
        at: 1453285495178
      },
      objects: {
        99: [
          { id: 1, title: 't1', completed: true },
          { id: 2, title: 't2', completed: false }
        ]
      }
    };
    const requestState = tasksReducer(initialState, action);
    expect(requestState).toEqual(expectedState);

    // success
    action = {
      type: types.toggle.success,
      $operation: -9999,
      id: 2,
      projectId: 99,
      task: { id: 2, title: 't2', completed: true }
    };
    expectedState = {
      meta: {
        loading: false,
        creating: { $pending: false, title: null },
        pending: [],
        at: 1453285495178
      },
      objects: {
        99: [
          { id: 1, title: 't1', completed: true },
          { id: 2, title: 't2', completed: true }
        ]
      }
    };
    const successState = tasksReducer(requestState, action);
    expect(successState).toEqual(expectedState);

    // failure
    action = {
      type: types.toggle.failure,
      $operation: -9999,
      flash: 'Something went wrong.',
      error: new Error()
    };
    expectedState = {
      meta: {
        loading: false,
        creating: { $pending: false, title: null },
        pending: [],
        at: 1453285495178
      },
      objects: {
        99: [
          { id: 1, title: 't1', completed: true },
          { id: 2, title: 't2', completed: false }
        ]
      }
    };
    const failureState = tasksReducer(requestState, action);
    expect(failureState).toEqual(expectedState);
  });


  it('should handle task/toggle_all/*', () => {
    const initialState = {
      meta: {
        loading: false,
        creating: { $pending: false, title: null },
        pending: [],
        at: 1453285495178
      },
      objects: {
        99: [
          { id: 1, title: 't1', completed: true },
          { id: 2, title: 't2', completed: false },
          { id: 3, title: 't3', completed: false }
        ]
      }
    };

    let action, expectedState;

    // request
    action = {
      type: types.toggle_all.request,
      $operation: -9999,
      projectId: 99,
      completed: true
    };
    expectedState = {
      meta: {
        loading: false,
        creating: { $pending: false, title: null },
        pending: [
          { id: 2, completed: true, $operation: -9999, $cause: 'updating' },
          { id: 3, completed: true, $operation: -9999, $cause: 'updating' }
        ],
        at: 1453285495178
      },
      objects: {
        99: [
          { id: 1, title: 't1', completed: true },
          { id: 2, title: 't2', completed: false },
          { id: 3, title: 't3', completed: false }
        ]
      }
    };
    const requestState = tasksReducer(initialState, action);
    expect(requestState).toEqual(expectedState);

    // success
    action = {
      type: types.toggle_all.success,
      $operation: -9999,
      projectId: 99,
      ids: [2, 3],
      completed: true
    };
    expectedState = {
      meta: {
        loading: false,
        creating: { $pending: false, title: null },
        pending: [],
        at: 1453285495178
      },
      objects: {
        99: [
          { id: 1, title: 't1', completed: true },
          { id: 2, title: 't2', completed: true },
          { id: 3, title: 't3', completed: true }
        ]
      }
    };
    const successState = tasksReducer(requestState, action);
    expect(successState).toEqual(expectedState);

    // failure
    action = {
      type: types.toggle_all.failure,
      $operation: -9999,
      projectId: 99,
      flash: 'Something went wrong.',
      error: new Error()
    };
    expectedState = {
      meta: {
        loading: false,
        creating: { $pending: false, title: null },
        pending: [],
        at: 1453285495178
      },
      objects: {
        99: [
          { id: 1, title: 't1', completed: true },
          { id: 2, title: 't2', completed: false },
          { id: 3, title: 't3', completed: false }
        ]
      }
    };
    const failureState = tasksReducer(requestState, action);
    expect(failureState).toEqual(expectedState);
  });


  it('should handle task/destroy/*', () => {
    const initialState = {
      meta: {
        loading: false,
        creating: { $pending: false, title: null },
        pending: [],
        at: 1453285495178
      },
      objects: {
        99: [
          { id: 1, title: 't1', completed: true },
          { id: 2, title: 't2', completed: false }
        ]
      }
    };

    let action, expectedState;

    // request
    action = {
      type: types.destroy.request,
      $operation: -9999,
      id: 2
    };
    expectedState = {
      meta: {
        loading: false,
        creating: { $pending: false, title: null },
        pending: [
          { id: 2, $operation: -9999, $cause: 'deleting' }
        ],
        at: 1453285495178
      },
      objects: {
        99: [
          { id: 1, title: 't1', completed: true },
          { id: 2, title: 't2', completed: false }
        ]
      }
    };
    const requestState = tasksReducer(initialState, action);
    expect(requestState).toEqual(expectedState);

    // success
    action = {
      type: types.destroy.success,
      $operation: -9999,
      id: 2,
      projectId: 99
    };
    expectedState = {
      meta: {
        loading: false,
        creating: { $pending: false, title: null },
        pending: [],
        at: 1453285495178
      },
      objects: {
        99: [
          { id: 1, title: 't1', completed: true }
        ]
      }
    };
    const successState = tasksReducer(requestState, action);
    expect(successState).toEqual(expectedState);

    // failure
    action = {
      type: types.destroy.failure,
      $operation: -9999,
      id: 2,
      flash: 'Something went wrong.',
      error: new Error()
    };
    expectedState = {
      meta: {
        loading: false,
        creating: { $pending: false, title: null },
        pending: [],
        at: 1453285495178
      },
      objects: {
        99: [
          { id: 1, title: 't1', completed: true },
          { id: 2, title: 't2', completed: false }
        ]
      }
    };
    const failureState = tasksReducer(requestState, action);
    expect(failureState).toEqual(expectedState);
  });


  it('should handle task/clear_completed/*', () => {
    const initialState = {
      meta: {
        loading: false,
        creating: { $pending: false, title: null },
        pending: [],
        at: 1453285495178
      },
      objects: {
        99: [
          { id: 1, title: 't1', completed: true },
          { id: 2, title: 't2', completed: false },
          { id: 3, title: 't3', completed: true }
        ]
      }
    };

    let action, expectedState;

    // request
    action = {
      type: types.clear_completed.request,
      $operation: -9999,
      projectId: 99
    };
    expectedState = {
      meta: {
        loading: false,
        creating: { $pending: false, title: null },
        pending: [
          { id: 1, $operation: -9999, $cause: 'deleting' },
          { id: 3, $operation: -9999, $cause: 'deleting' }
        ],
        at: 1453285495178
      },
      objects: {
        99: [
          { id: 1, title: 't1', completed: true },
          { id: 2, title: 't2', completed: false },
          { id: 3, title: 't3', completed: true }
        ]
      }
    };
    const requestState = tasksReducer(initialState, action);
    expect(requestState).toEqual(expectedState);

    // success
    action = {
      type: types.clear_completed.success,
      $operation: -9999,
      projectId: 99,
      ids: [1, 3]
    };
    expectedState = {
      meta: {
        loading: false,
        creating: { $pending: false, title: null },
        pending: [],
        at: 1453285495178
      },
      objects: {
        99: [
          { id: 2, title: 't2', completed: false }
        ]
      }
    };
    const successState = tasksReducer(requestState, action);
    expect(successState).toEqual(expectedState);

    // failure
    action = {
      type: types.clear_completed.failure,
      $operation: -9999,
      projectId: 99,
      flash: 'Something went wrong.',
      error: new Error()
    };
    expectedState = {
      meta: {
        loading: false,
        creating: { $pending: false, title: null },
        pending: [],
        at: 1453285495178
      },
      objects: {
        99: [
          { id: 1, title: 't1', completed: true },
          { id: 2, title: 't2', completed: false },
          { id: 3, title: 't3', completed: true }
        ]
      }
    };
    const failureState = tasksReducer(requestState, action);
    expect(failureState).toEqual(expectedState);
  });


  it('should handle project/destroy/*', () => {
    const initialState = {
      meta: {
        loading: false,
        creating: { $pending: false, title: null },
        pending: [],
        at: 1453285495178
      },
      objects: {
        98: [],
        99: [
          { id: 1, title: 't1', completed: true },
          { id: 2, title: 't2', completed: false }
        ]
      }
    };

    let action, expectedState;

    // request
    action = {
      type: projectTypes.destroy.request,
      $operation: -9999,
      id: 99
    };
    expectedState = {
      meta: {
        loading: false,
        creating: { $pending: false, title: null },
        pending: [],
        at: 1453285495178
      },
      objects: {
        98: [],
        99: [
          { id: 1, title: 't1', completed: true },
          { id: 2, title: 't2', completed: false }
        ]
      }
    };
    const requestState = tasksReducer(initialState, action);
    expect(requestState).toEqual(expectedState);

    // success
    action = {
      type: projectTypes.destroy.success,
      $operation: -9999,
      id: 99
    };
    expectedState = {
      meta: {
        loading: false,
        creating: { $pending: false, title: null },
        pending: [],
        at: 1453285495178
      },
      objects: {
        98: []
      }
    };
    const successState = tasksReducer(requestState, action);
    expect(successState).toEqual(expectedState);

    // failure
    action = {
      type: projectTypes.destroy.failure,
      $operation: -9999,
      id: 99,
      flash: 'Something went wrong.',
      error: new Error()
    };
    expectedState = {
      meta: {
        loading: false,
        creating: { $pending: false, title: null },
        pending: [],
        at: 1453285495178
      },
      objects: {
        98: [],
        99: [
          { id: 1, title: 't1', completed: true },
          { id: 2, title: 't2', completed: false }
        ]
      }
    };
    const failureState = tasksReducer(requestState, action);
    expect(failureState).toEqual(expectedState);
  });

});
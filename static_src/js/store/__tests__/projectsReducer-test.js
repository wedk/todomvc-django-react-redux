// js/store/__tests__/projectsReducer-test.js
jest.autoMockOff();

const types = require('../../constants/ProjectActionTypes').default;
const projectsReducer = require('../projectsReducer').default;


describe('projectsReducer', () => {

  it('should have an initial state', () => {
    const action = { type: '__ARBITRARY__' };
    const state = undefined;
    const expectedState = {
      meta: {
        loading: false,
        creating: { $pending: false, name: null },
        pending: [],
        at: 0
      },
      objects: []
    };
    expect(projectsReducer(state, action)).toEqual(expectedState);
  });


  it('should handle project/all/*', () => {
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
        creating: { $pending: false, name: null },
        pending: [],
        at: 0
      },
      objects: []
    };
    const requestState = projectsReducer(initialState, action);
    expect(requestState).toEqual(expectedState);

    // success
    action = {
      type: types.all.success,
      $operation: -9999,
      projects: [
        { id: 1, name: 'p1' },
        { id: 2, name: 'p2' }
      ]
    };
    expectedState = {
      meta: {
        loading: false,
        creating: { $pending: false, name: null },
        pending: [],
        at: jasmine.any(Number)
      },
      objects: [
        { id: 1, name: 'p1' },
        { id: 2, name: 'p2' }
      ]
    };
    const successState = projectsReducer(requestState, action);
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
        creating: { $pending: false, name: null },
        pending: [],
        at: 0
      },
      objects: []
    };
    const failureState = projectsReducer(requestState, action);
    expect(failureState).toEqual(expectedState);
  });


  it('should handle project/create/*', () => {
    const initialState = undefined;
    let action, expectedState;

    // request
    action = {
      type: types.create.request,
      $operation: -9999,
      name: 'p1'
    };
    expectedState = {
      meta: {
        loading: false,
        creating: { $pending: true, name: 'p1' },
        pending: [],
        at: 0
      },
      objects: []
    };
    const requestState = projectsReducer(initialState, action);
    expect(requestState).toEqual(expectedState);

    // success
    action = {
      type: types.create.success,
      $operation: -9999,
      project: { id: 1, name: 'p1' }
    };
    expectedState = {
      meta: {
        loading: false,
        creating: { $pending: false, name: null },
        pending: [],
        at: 0
      },
      objects: [
        { id: 1, name: 'p1' }
      ]
    };
    const successState = projectsReducer(requestState, action);
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
        creating: { $pending: false, name: 'p1' },
        pending: [],
        at: 0
      },
      objects: []
    };
    const failureState = projectsReducer(requestState, action);
    expect(failureState).toEqual(expectedState);
  });


  it('should handle project/update/*', () => {
    const initialState = {
      meta: {
        loading: false,
        creating: { $pending: false, name: null },
        pending: [],
        at: 1453285495178
      },
      objects: [
        { id: 1, name: 'p1' },
        { id: 2, name: 'p2' }
      ]
    };

    let action, expectedState;

    // request
    action = {
      type: types.update.request,
      $operation: -9999,
      id: 2,
      name: 'new p2'
    };
    expectedState = {
      meta: {
        loading: false,
        creating: { $pending: false, name: null },
        pending: [
          { id: 2, name: 'new p2', $operation: -9999, $cause: 'updating' }
        ],
        at: 1453285495178
      },
      objects: [
        { id: 1, name: 'p1' },
        { id: 2, name: 'p2' }
      ]
    };
    const requestState = projectsReducer(initialState, action);
    expect(requestState).toEqual(expectedState);

    // success
    action = {
      type: types.update.success,
      $operation: -9999,
      id: 2,
      project: { id: 2, name: 'new p2' }
    };
    expectedState = {
      meta: {
        loading: false,
        creating: { $pending: false, name: null },
        pending: [],
        at: 1453285495178
      },
      objects: [
        { id: 1, name: 'p1' },
        { id: 2, name: 'new p2' }
      ]
    };
    const successState = projectsReducer(requestState, action);
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
        creating: { $pending: false, name: null },
        pending: [],
        at: 1453285495178
      },
      objects: [
        { id: 1, name: 'p1' },
        { id: 2, name: 'p2' }
      ]
    };
    const failureState = projectsReducer(requestState, action);
    expect(failureState).toEqual(expectedState);
  });


  it('should handle project/destroy/*', () => {
    const initialState = {
      meta: {
        loading: false,
        creating: { $pending: false, name: null },
        pending: [],
        at: 1453285495178
      },
      objects: [
        { id: 1, name: 'p1' },
        { id: 2, name: 'p2' }
      ]
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
        creating: { $pending: false, name: null },
        pending: [
          { id: 2, $operation: -9999, $cause: 'deleting' }
        ],
        at: 1453285495178
      },
      objects: [
        { id: 1, name: 'p1' },
        { id: 2, name: 'p2' }
      ]
    };
    const requestState = projectsReducer(initialState, action);
    expect(requestState).toEqual(expectedState);

    // success
    action = {
      type: types.destroy.success,
      $operation: -9999,
      id: 2
    };
    expectedState = {
      meta: {
        loading: false,
        creating: { $pending: false, name: null },
        pending: [],
        at: 1453285495178
      },
      objects: [
        { id: 1, name: 'p1' }
      ]
    };
    const successState = projectsReducer(requestState, action);
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
        creating: { $pending: false, name: null },
        pending: [],
        at: 1453285495178
      },
      objects: [
        { id: 1, name: 'p1' },
        { id: 2, name: 'p2' }
      ]
    };
    const failureState = projectsReducer(requestState, action);
    expect(failureState).toEqual(expectedState);
  });

});
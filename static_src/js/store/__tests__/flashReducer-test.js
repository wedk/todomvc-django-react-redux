// js/store/__tests__/flashReducer-test.js
jest.autoMockOff();

const types = require('../../constants/AppActionTypes').default;
const flashReducer = require('../flashReducer').default;


describe('flashReducer', () => {

  it('has an empty object as initial state', () => {
    const action = { type: 'arbitrary/unknown/unknown' };
    const state = undefined;
    expect(flashReducer(state, action)).toEqual({});
  });

  it('should preserve its state on unknown action', () => {
    const action = { type: 'arbitrary/unknown/unknown' };
    const state = { message: 'Something went wrong.' };
    expect(flashReducer(state, action)).toEqual(state);
  });

  it('should dismiss its state', () => {
    const action = { type: types.flash.dismiss };
    const state = { message: 'Something went wrong.' };
    expect(flashReducer(state, action)).toEqual({});
  });

  it('should set the flash message on failure', () => {
    const action = { type: 'arbitrary/unknown/failure', flash: 'Something went wrong.' };
    const state = {};
    expect(flashReducer(state, action)).toEqual({ message: 'Something went wrong.' });
  });

  it('should override existing flash message on failure', () => {
    const action = { type: 'arbitrary/unknown/failure', flash: 'Something went wrong.' };
    const state = { message: 'Something bad.' };
    expect(flashReducer(state, action)).toEqual({ message: 'Something went wrong.' });
  });

  it('should ignore failure without a flash attribute', () => {
    const action = { type: 'arbitrary/unknown/failure' };
    const state = {};
    expect(flashReducer(state, action)).toEqual({});
  });

  it('should ignore flash message from none-failure action type', () => {
    const action = { type: 'arbitrary/unknown/success', flash: 'Something went well.' };
    const state = {};
    expect(flashReducer(state, action)).toEqual({});
  });

});
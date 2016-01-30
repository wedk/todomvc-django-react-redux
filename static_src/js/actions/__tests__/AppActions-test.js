// js/actions/__tests__/AppActions-test.js
jest.dontMock('../AppActions');
jest.dontMock('../../constants/AppActionTypes');
jest.dontMock('../../utils/ActionTypesUtils');


describe('AppActions', () => {

  let types;


  beforeEach(() => {
    types = require('../../constants/AppActionTypes').default;
  });


  it('should dismiss flash', () => {
    const AppActions = require('../AppActions');
    expect(AppActions.dismissFlash()).toEqual({
      type: types.flash.dismiss
    });
  });

});
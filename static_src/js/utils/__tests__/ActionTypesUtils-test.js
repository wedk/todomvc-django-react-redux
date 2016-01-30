// js/utils/__tests__/ActionTypesUtils-test.js
jest.dontMock('../ActionTypesUtils');

const buildActionTypes = require('../ActionTypesUtils').buildActionTypes;


describe('ActionTypesUtils.buildActionTypes', () => {

  it('should generate action types from an array', () => {
    const actions = ['type1', 'type2', 'type3'];
    const types = { type1: 'type1', type2: 'type2', type3: 'type3' };
    expect(buildActionTypes(actions)).toEqual(types);
  });

  it('should generate prefixed action types from an array', () => {
    const actions = ['type1', 'type2', 'type3'];
    const prefix = 'prefix';
    const types = { type1: 'prefix/type1', type2: 'prefix/type2', type3: 'prefix/type3' };
    expect(buildActionTypes(actions, prefix)).toEqual(types);
  });

  it('should generate action types from an object', () => {
    const actions = { type1: null, type2: 'qwertz', type3: false, type4: 123, type5: undefined };
    const types = { type1: 'type1', type2: 'type2', type3: 'type3', type4: 'type4', type5: 'type5' };
    expect(buildActionTypes(actions)).toEqual(types);
  });

  it('should generate prefixed action types from an object', () => {
    const actions = { type1: null, type2: 'qwertz', type3: false, type4: 123, type5: undefined };
    const prefix = 'prefix';
    const types = { type1: 'prefix/type1', type2: 'prefix/type2', type3: 'prefix/type3', type4: 'prefix/type4',
                    type5: 'prefix/type5' };
    expect(buildActionTypes(actions, prefix)).toEqual(types);
  });

  it('should generate async action types from an object', () => {
    const actions = { type1: true, type2: null, type3: true };
    const types = {
      type1: {
        request: 'type1/request',
        success: 'type1/success',
        failure: 'type1/failure'
      },
      type2: 'type2',
      type3: {
        request: 'type3/request',
        success: 'type3/success',
        failure: 'type3/failure'
      }
    };
    expect(buildActionTypes(actions)).toEqual(types);
  });

  it('should generate prefixed async action types from an object', () => {
    const actions = { type1: true, type2: null, type3: true };
    const prefix = 'prefix';
    const types = {
      type1: {
        request: 'prefix/type1/request',
        success: 'prefix/type1/success',
        failure: 'prefix/type1/failure'
      },
      type2: 'prefix/type2',
      type3: {
        request: 'prefix/type3/request',
        success: 'prefix/type3/success',
        failure: 'prefix/type3/failure'
      }
    };
    expect(buildActionTypes(actions, prefix)).toEqual(types);
  });

  it('should recursively generate action types from a composite object', () => {
    const actions = { type1: { subtype1: ['one', 'two', 'three'] }, type2: null, type3: null };
    const types = {
      type1: {
        subtype1: {
          one: 'type1/subtype1/one',
          two: 'type1/subtype1/two',
          three: 'type1/subtype1/three'
        }
      },
      type2: 'type2',
      type3: 'type3'
    };
    expect(buildActionTypes(actions)).toEqual(types);
  });

  it('should recursively generate prefixed action types from a composite object', () => {
    const actions = { type1: { subtype1: ['one', 'two', 'three'] }, type2: null, type3: null };
    const prefix = 'prefix';
    const types = {
      type1: {
        subtype1: {
          one: 'prefix/type1/subtype1/one',
          two: 'prefix/type1/subtype1/two',
          three: 'prefix/type1/subtype1/three'
        }
      },
      type2: 'prefix/type2',
      type3: 'prefix/type3'
    };
    expect(buildActionTypes(actions, prefix)).toEqual(types);
  });

});
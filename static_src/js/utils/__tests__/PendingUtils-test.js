// js/utils/__tests__/PendingUtils-test.js
jest.dontMock('../PendingUtils');

const integratePendings = require('../PendingUtils').integratePendings;


describe('PendingUtils.integratePendings', () => {

  it('should accept empty inputs', () => {
    const objects = [];
    const pendingItems = [];
    const expectedObjects = objects;

    expect(integratePendings(objects, pendingItems)).toBe(expectedObjects);
  });


  it('should accept undefined objects', () => {
    const objects = undefined;
    const pendingItems = [];
    const expectedObjects = [];

    expect(integratePendings(objects, pendingItems)).toEqual(expectedObjects);
  });


  it('should accept null objects', () => {
    const objects = null;
    const pendingItems = [];
    const expectedObjects = [];

    expect(integratePendings(objects, pendingItems)).toEqual(expectedObjects);
  });


  it('should accept undefined pendings', () => {
    const objects = [];
    const pendingItems = undefined;
    const expectedObjects = objects;

    expect(integratePendings(objects, pendingItems)).toBe(expectedObjects);
  });


  it('should accept null pendings', () => {
    const objects = [];
    const pendingItems = null;
    const expectedObjects = objects;

    expect(integratePendings(objects, pendingItems)).toBe(expectedObjects);
  });


  it('should return unchanged objects if no pendings', () => {
    const objects = [
      { id: 1, title: 't1', completed: false },
      { id: 2, title: 't2', completed: true }
    ];
    const pendingItems = [];
    const expectedObjects = objects;

    expect(integratePendings(objects, pendingItems)).toBe(expectedObjects);
  });


  it('should integrate pendings', () => {
    const objects = [
      { id: 1, title: 't1', completed: false },
      { id: 2, title: 't2', completed: true  },
      { id: 3, title: 't3', completed: false },
      { id: 4, title: 't4', completed: true  }
    ];
    const pendingItems = [
      { id: 1, title: 't1.1', $operation: -9999, $cause: 'updating' },
      { id: 3, completed: true, $operation: -8888, $cause: 'updating' },
      { id: 4, $operation: -7777, $cause: 'deleting' }
    ];
    const expectedObjects = [
      { id: 1, title: 't1.1', _title: 't1', completed: false, $operation: -9999, $cause: 'updating', $pending: true },
      { id: 2, title: 't2', completed: true },
      { id: 3, title: 't3', completed: true, _completed: false, $operation: -8888, $cause: 'updating', $pending: true },
      { id: 4, title: 't4', completed: true, $operation: -7777, $cause: 'deleting', $pending: true }
    ];

    const preparedObjects = integratePendings(objects, pendingItems);
    expect(preparedObjects).toEqual(expectedObjects);

    preparedObjects.forEach((obj) => {
      expect(obj.hasOwnProperty('_$operation')).toBe(false);
      expect(obj.hasOwnProperty('_$cause')).toBe(false);
    });
  });

});
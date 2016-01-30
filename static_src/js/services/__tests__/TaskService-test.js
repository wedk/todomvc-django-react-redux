// js/services/__tests__/TaskService-test.js
jest.dontMock('../TaskService');
jest.dontMock('../../utils/PendingUtils');

const TaskService = require('../TaskService').default;


describe('TaskService', () => {

  describe('Main success scenario', () => {

    let tasksState, taskService;

    beforeEach(() => {

      tasksState = {
        objects: {
          8: [
            { id: 1, title: 't1', completed: true },
            { id: 2, title: 't2', completed: false },
            { id: 3, title: 't3', completed: true }
          ],
          9: []
        },
        meta: {
          pending: [
            { id: 1, title: 't1.1', $operation: -9999, $cause: 'updating' }
          ]
        }
      };

      taskService = new TaskService(tasksState, 8);
    });


    describe('#findAll', () => {
      it('should find all tasks', () => {
        const expectedTasks = [
          { id: 1, title: 't1.1', _title: 't1', completed: true,
            $operation: -9999, $cause: 'updating', $pending: true },
          { id: 2, title: 't2', completed: false },
          { id: 3, title: 't3', completed: true }
        ];
        expect(taskService.findAll()).toEqual(expectedTasks);
      });
    });


    describe('#findActive', () => {
      it('should find all active tasks', () => {
        const expectedTasks = [
          { id: 2, title: 't2', completed: false }
        ];
        expect(taskService.findActive()).toEqual(expectedTasks);
      });
    });


    describe('#findCompleted', () => {
      it('should find all completed tasks', () => {
        const expectedTasks = [
          { id: 1, title: 't1.1', _title: 't1', completed: true,
            $operation: -9999, $cause: 'updating', $pending: true },
          { id: 3, title: 't3', completed: true }
        ];
        expect(taskService.findCompleted()).toEqual(expectedTasks);
      });
    });


    describe('#findByFilter', () => {

      it('should find all tasks', () => {
        const expectedTasks = [
          { id: 1, title: 't1.1', _title: 't1', completed: true,
            $operation: -9999, $cause: 'updating', $pending: true },
          { id: 2, title: 't2', completed: false },
          { id: 3, title: 't3', completed: true }
        ];
        expect(taskService.findByFilter('all')).toEqual(expectedTasks);
      });

      it('should find all active tasks', () => {
        const expectedTasks = [
          { id: 2, title: 't2', completed: false }
        ];
        expect(taskService.findByFilter('active')).toEqual(expectedTasks);
      });

      it('should find all completed tasks', () => {
        const expectedTasks = [
          { id: 1, title: 't1.1', _title: 't1', completed: true,
            $operation: -9999, $cause: 'updating', $pending: true },
          { id: 3, title: 't3', completed: true }
        ];
        expect(taskService.findByFilter('completed')).toEqual(expectedTasks);
      });

      it('should return an empty collection when unknown filter', () => {
        expect(taskService.findByFilter('__unknown__')).toEqual([]);
      });

    });


    describe('#count', () => {
      it('should count all tasks', () => {
        expect(taskService.count()).toEqual(3);
      });
    });


    describe('#getReport', () => {
      it('should generate a report based on all tasks', () => {
        expect(taskService.getReport()).toEqual({
          count: 3,
          active: 1,
          completed: 2
        });
      });
    });

  });


  describe('Edge cases', () => {

    it('should work with unknown project', () => {
      const tasksState = {
        objects: {},
        meta: {}
      };
      const taskService = new TaskService(tasksState, 8);

      expect(taskService.findAll()).toEqual([]);
      expect(taskService.findActive()).toEqual([]);
      expect(taskService.findCompleted()).toEqual([]);
      expect(taskService.findByFilter('all')).toEqual([]);
      expect(taskService.findByFilter('active')).toEqual([]);
      expect(taskService.findByFilter('completed')).toEqual([]);
      expect(taskService.count()).toEqual(0);
      expect(taskService.getReport()).toEqual({
        count: 0,
        active: 0,
        completed: 0
      });
    });

  });


});
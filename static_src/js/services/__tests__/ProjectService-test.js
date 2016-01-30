// js/services/__tests__/ProjectService-test.js
jest.dontMock('../ProjectService');
jest.dontMock('../../utils/PendingUtils');

const ProjectService = require('../ProjectService').default;


describe('ProjectService', () => {


  describe('#findAll', () => {

    it('should find all projects', () => {
      const projectsState = {
        objects: [
          { id: 1, name: 'p1' },
          { id: 2, name: 'p2' }
        ],
        meta: {}
      }
      const projectService = new ProjectService(projectsState);
      const expectedProjects = projectsState.objects;
      expect(projectService.findAll()).toEqual(expectedProjects);
    });


    it('should integrate pendings', () => {
      const projectsState = {
        objects: [
          { id: 1, name: 'p1' },
          { id: 2, name: 'p2' }
        ],
        meta: {
          pending: [
            { id: 1, name: 'p1.1', $operation: -9999, $cause: 'updating' }
          ]
        }
      }

      const projectService = new ProjectService(projectsState);

      const expectedProjects = [
        { id: 1, name: 'p1.1', _name: 'p1', $operation: -9999, $cause: 'updating', $pending: true },
        { id: 2, name: 'p2' }
      ];

      expect(projectService.findAll()).toEqual(expectedProjects);
    });

  });


  describe('#find', () => {

    it('should find a project by id', () => {
      const projectsState = {
        objects: [
          { id: 1, name: 'p1' },
          { id: 2, name: 'p2' }
        ],
        meta: {}
      }
      const projectService = new ProjectService(projectsState);
      const expectedProject = projectsState.objects[1];
      expect(projectService.find(2)).toEqual(expectedProject);
    });


    it('should return null when project not found', () => {
      const projectsState = {
        objects: [],
        meta: {}
      }
      const projectService = new ProjectService(projectsState);
      expect(projectService.find(9)).toBeUndefined();
    });


    it('should integrate pendings', () => {
      const projectsState = {
        objects: [
          { id: 1, name: 'p1' },
          { id: 2, name: 'p2' }
        ],
        meta: {
          pending: [
            { id: 1, name: 'p1.1', $operation: -9999, $cause: 'updating' }
          ]
        }
      }

      const projectService = new ProjectService(projectsState);

      const expectedProject = {
        id: 1,
        name: 'p1.1',
        _name: 'p1',
        $operation: -9999,
        $cause: 'updating',
        $pending: true
      };

      expect(projectService.find(1)).toEqual(expectedProject);
    });

  });


});
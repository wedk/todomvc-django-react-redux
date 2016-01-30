// js/services/ProjectService.js
import { integratePendings } from '../utils/PendingUtils';


class ProjectService {

  constructor(projectsState) {
    this.projects = integratePendings(
      projectsState.objects,
      projectsState.meta.pending
    );
  }

  findAll() {
    return this.projects;
  }

  find(id) {
    return this.projects.filter(project => project.id == id)[0];
  }

}


export default ProjectService;
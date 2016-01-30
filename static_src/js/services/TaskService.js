// js/services/TaskService.js
import { integratePendings } from '../utils/PendingUtils';


class TaskService {

  constructor(tasksState, projectId) {
    this.tasks = integratePendings(
      tasksState.objects[projectId],
      tasksState.meta.pending
    );
  }

  findByFilter(filter) {
    switch (filter) {
      case 'all':
        return this.findAll();
      case 'active':
        return this.findActive();
      case 'completed':
        return this.findCompleted();
      default:
        return []
    }
  }

  findAll() {
    return this.tasks;
  }

  findActive() {
    return this.tasks.filter(task => !task.completed);
  }

  findCompleted() {
    return this.tasks.filter(task => task.completed);
  }

  count() {
    return this.tasks.length;
  }

  getReport() {
    const count = this.count();
    const active = this.findActive().length;

    return {
      count,
      active,
      completed: count - active
    };
  }

}


export default TaskService;
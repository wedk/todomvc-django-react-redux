// js/actions/TaskActionTypes.js
import { buildActionTypes } from '../utils/ActionTypesUtils';


export default buildActionTypes({
  all: true,
  create: true,
  update: true,
  destroy: true,
  toggle: true,
  toggle_all: true,
  clear_completed: true
}, 'task');
// js/constants/ProjectActionTypes.js
import { buildActionTypes } from '../utils/ActionTypesUtils';


export default buildActionTypes({
  all: true,
  one: true,
  create: true,
  update: true,
  destroy: true
}, 'project');
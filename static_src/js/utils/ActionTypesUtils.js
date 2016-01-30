// js/utils/ActionTypesUtils.js

const hasOwnProperty = {}.hasOwnProperty;
const SEPARATOR = '/';
const ASYNC_TYPES = ['request', 'success', 'failure'];


export function buildActionTypes(actions, prefix) {

  function addPrefix(value) {
    return prefix ? prefix + SEPARATOR + value : value;
  }

  if (Array.isArray(actions)) {
    let h = {};
    for (let i=0; i<actions.length; i++) {
      h[actions[i]] = addPrefix(actions[i]);
    }
    return h;
  }

  for (var key in actions) {
    if (hasOwnProperty.call(actions, key)) {

      if (actions[key] === true) {
        actions[key] = buildActionTypes(ASYNC_TYPES, addPrefix(key));
      } else if ((actions[key] != null && typeof actions[key] === 'object') || Array.isArray(actions[key])) {
        actions[key] = buildActionTypes(actions[key], addPrefix(key));
      } else {
        actions[key] = addPrefix(key);
      }

    }
  }

  return actions;
}
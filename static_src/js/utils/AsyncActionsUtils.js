// js/utils/AsyncActionsUtils.js
import { fetchJson } from './ApiUtils';


const DEFAULT_FLASH_MESSAGE = 'Oops. Something went wrong. Please try again.';
const FRESHNESS = 1 * 60 * 1000; // 1 minute


export function isFresh(at) {
  const now = new Date().getTime();
  return now - at < FRESHNESS;
}


// generate a negative integer to be used as client-side ID
function getRndId() {
  return Math.round(Math.random() * 10000000) * -1;
}


export default function Api(dispatch, asyncType, options = {}) {

  let { flash = DEFAULT_FLASH_MESSAGE, ...meta } = options;

  function async(method, url, bodyToStringify, successTransform) {

    // generate a random operation ID (useful for batch operation)
    meta.$operation = getRndId();

    dispatch({ ...meta, type: asyncType.request, ...bodyToStringify });

    return fetchJson(method, url, bodyToStringify)
      .then(function(data) {
        dispatch({ ...meta, ...successTransform(data), type: asyncType.success });
      }).catch(function(error) {
        dispatch({ ...meta, type: asyncType.failure, error, flash });
      });
  }

  return {

    get(url, successTransform) {
      return async('GET', url, undefined, successTransform);
    },

    create(url, bodyToStringify, successTransform) {
      return async('POST', url, bodyToStringify, successTransform);
    },

    update(url, bodyToStringify, successTransform) {
      return async('PATCH', url, bodyToStringify, successTransform);
    },

    destroy(url, successTransform) {
      return async('DELETE', url, undefined, successTransform);
    }

  }

}
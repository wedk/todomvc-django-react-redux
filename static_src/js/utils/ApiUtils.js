// js/utils/ApiUtils.js

const MIME = 'application/json';

const HEADERS_NO_CONTENT = {
  'Accept': MIME
};

const HEADERS_CONTENT = {
  'Accept': MIME,
  'Content-Type': MIME
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJson(response) {
  return response.status === 204 // No Content
    ? response
    : response.json()
}

function prepareHeaders(method) {
  let upcasedMethod = method.toUpperCase();
  return (upcasedMethod === 'GET' ||  upcasedMethod === 'HEAD')
    ? HEADERS_NO_CONTENT
    : HEADERS_CONTENT;
}


export function fetchJson(method, url, bodyToStringify) {
  return fetch(url, {
    method: method,
    headers: prepareHeaders(method),
    body: JSON.stringify(bodyToStringify)
  })
  .then(checkStatus)
  .then(parseJson);
}
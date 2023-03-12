'use strict';

import { AVATAR_ENDPOINT, V1_WHOAMI_ENDPOINT } from '../../config';
import { post as postMessage } from '../ChatContainer/api';

function callWhoami() {
  return fetch(V1_WHOAMI_ENDPOINT, {
    credentials: 'include'
  }).then((response) => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }

    return response.json();
  });
}

export function load() {
  return callWhoami().then((responseJson) => {
    if (!responseJson.sync_message) {
      return responseJson;
    }

    return postMessage(responseJson.sync_message, null).then(load, load);
  });
}

export function upload(file) {
  const formdata = new FormData();
  formdata.append('avatar', file);

  return fetch(`${AVATAR_ENDPOINT}&act=upload`, {
    method: 'POST',
    body: formdata,
    credentials: 'include'
  })
    .then(response => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    });
}

export function set(avatar) {
  const formdata = new FormData();
  formdata.append('avatar', avatar);
  return fetch(`${AVATAR_ENDPOINT}&act=set`, {
    method: 'POST',
    body: formdata,
    credentials: 'include'
  })
    .then(response => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    });
}

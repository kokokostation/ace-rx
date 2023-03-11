'use strict';

import { AVATAR_ENDPOINT, CHAT_ENDPOINT, V1_WHOAMI_ENDPOINT } from '../../config';

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

    const formdata = new FormData();
    formdata.append('text', encodeURIComponent(responseJson.sync_message));

    return fetch(`${CHAT_ENDPOINT}&act=post`, {
      method: 'POST',
      body: formdata,
      credentials: 'include'
    }).finally(() => load());
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

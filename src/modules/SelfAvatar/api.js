'use strict';

import { AVATAR_ENDPOINT, CHAT_ENDPOINT, V1_WHOAMI_ENDPOINT } from '../../config';

async function callWhoami() {
  const response = await fetch(V1_WHOAMI_ENDPOINT, {
    credentials: 'include'
  });

  if (response.status >= 400) {
    throw new Error('Bad response from server');
  }

  return response.json();
}

export async function load() {
  /* eslint-disable no-await-in-loop,no-constant-condition */
  while (true) {
    const responseJson = await callWhoami();
    if (!responseJson.sync_message) {
      return responseJson;
    }

    const formdata = new FormData();
    formdata.append('text', encodeURIComponent(responseJson.sync_message));

    await fetch(`${CHAT_ENDPOINT}&act=post`, {
      method: 'POST',
      body: formdata,
      credentials: 'include'
    });
  }
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

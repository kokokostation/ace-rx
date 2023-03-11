'use strict';

import {
  CHAT_ENDPOINT,
  CONTROL_ENDPOINT,
  LOG_ENDPOINT,
  V1_MESSAGE_ENDPOINT,
  V1_MESSAGE_LIST_ENDPOINT
} from '../../config';

export function load(lastMessageId, forceSync) {
  const url = new URL(V1_MESSAGE_LIST_ENDPOINT);
  url.searchParams.append('last', lastMessageId);
  if (forceSync) {
    url.searchParams.append('force_sync', '1');
  }

  return fetch(url, {
    credentials: 'include'
  })
    .then(response => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    });
}

export async function post(message, file) {
  await fetch(V1_MESSAGE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: message
    }),
    credentials: 'include'
  });

  const formdata = new FormData();
  formdata.append('text', encodeURIComponent(message));
  if (file) {
    formdata.append('filedata', file);
  }

  return fetch(`${CHAT_ENDPOINT}&act=post`, {
    method: 'POST',
    body: formdata,
    credentials: 'include'
  })
    .then(response => response.text());
}

export function control(method, messageId) {
  return fetch(`${CONTROL_ENDPOINT}&act=${method}&id=${messageId}`, {
    credentials: 'include'
  })
    .then(response => response.json())
    .then(response => response.msg);
}

export function loadLog(date) {
  const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return fetch(`${LOG_ENDPOINT}&log=${formattedDate}`, {
    credentials: 'include'
  })
    .then(response => response.json());
}

'use strict';

import {
  SHOW_PREVIEW,
  HIDE_PREVIEW
} from '../../actionTypes';

export function showPreview(id) {
  return (dispatch, getState) => {
    const message = getState().chatContainer.messages.find(msg => msg.id === id);
    dispatch({
      type: SHOW_PREVIEW,
      data: message
    });
  };
}

export function hidePreview() {
  return { type: HIDE_PREVIEW };
}

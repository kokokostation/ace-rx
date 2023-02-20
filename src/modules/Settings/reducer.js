'use strict';

import {
  SETTINGS_OPEN,
  SETTINGS_CLOSE,
  SETTINGS_SET
} from '../../actionTypes';

import { updateState } from '../../utils';

const initialState = {
  isOpen: false,
  postingMode: null,
  showImages: true,
  showYoutube: true,
  showWebm: true,
  personalChatEnabled: false
};

export default function (state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case SETTINGS_OPEN:
      return updateState(state, { isOpen: true });

    case SETTINGS_CLOSE:
      return updateState(state, { isOpen: false });

    case SETTINGS_SET:
      return updateState(state, data);

    default:
      return state;
  }
}

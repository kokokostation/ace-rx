'use strict';

import {
  AVATAR_LOAD,
  AVATAR_SET_UPLOADING
} from '../../actionTypes';

import {
  updateState
} from '../../utils';

const initialState = {
  userId: '',
  image: null,
  uploading: false
};

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case AVATAR_LOAD:
      return updateState(state, {
        userId: data.user_id,
        image: data.avatar
      });
    case AVATAR_SET_UPLOADING:
      return updateState(state, {
        uploading: data
      });
    default:
      return state;
  }
}

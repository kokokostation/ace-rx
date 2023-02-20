'use strict';

import union from 'lodash/union';
import unionBy from 'lodash/unionBy';
import remove from 'lodash/remove';
import { updateState } from '../../utils';
import {
  CHAT_UPDATE,
  CHAT_START,
  CHAT_STOP,
  CHAT_EMPTY,
  CHAT_LOG,
  IGNORE_ADD,
  IGNORE_CLEAR,
  IGNORE_LOAD,
  CHOOSE_CHAT,
  WHITELIST_ADD,
  WHITELIST_REMOVE,
  WHITELIST_LOAD,
  WHITELIST_CLEAR
} from '../../actionTypes';
import { COMMON_CHAT } from './const';

import { REPLY_REGEXP } from '../../constants';

const initialState = {
  currentChat: COMMON_CHAT,
  whitelist: [],
  messages: [],
  lastMessageId: 0,
  timer: null,
  replies: {},
  ignoreList: [],
  logDate: null
};

export default function (state = initialState, action) {
  const { data, type } = action;

  switch (type) {

    case CHAT_UPDATE: {
      const lastMessage = data.slice(-1).pop();

      // Deleting messages
      data
        .filter(msg => msg.type === 'dlt')
        .forEach(msg => {
          const targetId = msg.text;
          // Mutate state intentionally. This message never existed
          remove(state.messages, (mess) => mess.id === targetId); // eslint-disable-line
          remove(data, (mess) => mess.id === targetId);
        });

      // Filter ignored and system messages
      const messages = data.filter(msg => !state.ignoreList.includes(msg.user_id) && msg.type !== 'dlt');

      // Genetare "answers"
      const replies = messages.reduce((acc, message) => {
        const targetId = message.id;
        const matches = message.text.match(REPLY_REGEXP) || [];

        matches.slice(0, 6).forEach(match => {
          const sourceId = match.replace('@', '');
          // merge existing replies, replies parsed in previous iteration and just parsed reply
          acc[sourceId] = union(state.replies[sourceId], acc[sourceId], [targetId]);
        });

        return acc;
      }, {});

      return updateState(state, {
        lastMessageId: lastMessage ? Number(lastMessage.id) : state.lastMessageId,
        messages: unionBy(state.messages, messages, 'id'),
        replies: updateState(state.replies, replies)
      });
    }

    case CHAT_START:
      return updateState(state, {
        timer: data
      });

    case CHAT_STOP:
      return updateState(state, {
        timer: null
      });

    case CHAT_EMPTY:
      return updateState(state, {
        messages: [],
        lastMessageId: 0
      });

    case IGNORE_ADD: {
      const targetUserId = data;
      return updateState(state, {
        messages: state.messages.filter(msg => msg.user_id !== targetUserId),
        ignoreList: [...state.ignoreList, targetUserId]
      });
    }

    case IGNORE_CLEAR:
      return updateState(state, {
        ignoreList: []
      });

    case IGNORE_LOAD:
      return updateState(state, {
        ignoreList: data || []
      });

    case CHAT_LOG:
      return updateState(state, {
        logDate: data
      });

    case CHOOSE_CHAT:
      return updateState(state, {
        currentChat: data
      });

    case WHITELIST_ADD:
      return updateState(state, {
        whitelist: [...state.whitelist, data]
      });

    case WHITELIST_REMOVE:
      return updateState(state, {
        whitelist: state.whitelist.filter(item => item !== data)
      });

    case WHITELIST_LOAD:
      return updateState(state, {
        whitelist: data || []
      });

    case WHITELIST_CLEAR:
      return updateState(state, {
        whitelist: []
      });

    default:
      return state;
  }
}

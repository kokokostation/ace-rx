import { CHOOSE_CHAT } from '../../actionTypes';

export function chooseChat(chatCode) {
  return { type: CHOOSE_CHAT, data: chatCode };
}

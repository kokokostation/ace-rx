'use strict';

import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './style/index.less';
import store from './store';
import { Component as Main } from './modules/Main';
import { actions as chatContainer } from './modules/ChatContainer';
import { actions as playlist } from './modules/Playlist';
import { actions as header } from './modules/RightHeader';
import { actions as avatar } from './modules/SelfAvatar';
import { actions as settings } from './modules/Settings';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const rootElement = document.getElementById('application');

store.dispatch(header.loadTopic());
store.dispatch(chatContainer.ignoreLoad());
store.dispatch(chatContainer.whitelistLoad());
store.dispatch(chatContainer.start());
store.dispatch(playlist.start());
if (localStorage.avatar) {
  store.dispatch(avatar.set(localStorage.avatar));
} else {
  store.dispatch(avatar.load());
}
store.dispatch(settings.load());

render(
  <Provider store={store}>
    <Main />
  </Provider>,
  rootElement
);

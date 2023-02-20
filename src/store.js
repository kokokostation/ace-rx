'use strict';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { reducer as chatContainer } from './modules/ChatContainer';
import { reducer as playlist } from './modules/Playlist';
import { reducer as postarea } from './modules/PostArea';
import { reducer as snackbar } from './modules/Snackbar';
import { reducer as preview } from './modules/MessagePreview';
import { reducer as info } from './modules/RightHeader';
import { reducer as imageFeed } from './modules/ImageFeed';
import { reducer as avatar } from './modules/SelfAvatar';
import { reducer as lightbox } from './modules/Lightbox';
import { reducer as settings } from './modules/Settings';

const rootReducer = combineReducers({
  chatContainer,
  playlist,
  postarea,
  snackbar,
  preview,
  info,
  imageFeed,
  avatar,
  lightbox,
  settings
});

const logger = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);

export default store;

'use strict';

import { connect } from 'react-redux';
import Component from './component';
import { actions as chatContainer } from '../ChatContainer';

function mapStateToProps(state) {
  return Object.assign({}, state.postarea, {
    settings: state.settings,
    logMode: Boolean(state.chatContainer.logDate)
  });
}

const actions = {
  send: chatContainer.send,
  exitLog: chatContainer.exitLog
};

export default connect(mapStateToProps, actions)(Component);

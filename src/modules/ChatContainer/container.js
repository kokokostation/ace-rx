'use strict';

import { connect } from 'react-redux';
import Component from './component';
import * as chatActions from './actions';
import { actions as previewActions } from '../MessagePreview';

function mapStateToProps(state) {
  return Object.assign({}, state.chatContainer, {
    logMode: Boolean(state.chatContainer.logDate),
    settings: state.settings,
    myUserId: state.avatar.userId
  });
}

const actions = Object.assign({}, chatActions, previewActions);

export default connect(mapStateToProps, actions)(Component);

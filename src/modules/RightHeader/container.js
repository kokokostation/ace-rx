'use strict';

import { connect } from 'react-redux';
import Component from './component';
import { actions as chatContainer } from '../ChatContainer';
import { actions as settings } from '../Settings';

function mapStateToProps(state) {
  return Object.assign({}, state.info, { logDate: state.chatContainer.logDate, settings: state.settings });
}

const actions = {
  ignoreClear: chatContainer.ignoreClear,
  whitelistClear: chatContainer.whitelistClear,
  openSettings: settings.open
};

export default connect(mapStateToProps, actions)(Component);

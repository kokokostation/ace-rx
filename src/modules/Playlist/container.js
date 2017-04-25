'use strict';

import { connect } from 'react-redux';
import Component from './component';
import * as actions from './actions';

function mapStateToProps(state) {
  return state.playlist;
}

export default connect(mapStateToProps, actions)(Component);

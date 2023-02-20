'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Component as Avatar } from '../Avatar';
import { Component as MessageMenu } from '../MessageMenu';

export default class MessageAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessageMenu: false
    };
  }

  showMessageMenu() {
    this.setState({
      showMessageMenu: true
    });
  }

  hideMessageMenu() {
    this.setState({
      showMessageMenu: false
    });
  }

  render() {
    const { id, user_id: userId, avatar, controls } = this.props.message;

    return (
      <div
        className='avatar'
        ref={ref => (this.avatarRef = ref)}
        onTouchTap={e => {
          e.preventDefault(); // ghost click on mobile closes menu
          if (this.props.logMode) return;
          this.showMessageMenu();
        }}
      >
        <Avatar userId={userId} image={avatar} />
        <MessageMenu
          open={this.state.showMessageMenu}
          anchorEl={this.avatarRef}
          hidePopover={this.hideMessageMenu.bind(this)}
          controls={controls}
          messageId={id}
          control={this.props.control}
          ignoreAdd={this.props.ignoreAdd}
          whitelistAdd={this.props.whitelistAdd}
          whitelistRemove={this.props.whitelistRemove}
        />
      </div>
    );
  }
}

MessageAvatar.propTypes = {
  message: PropTypes.object.isRequired,
  logMode: PropTypes.bool,
  control: PropTypes.func,
  ignoreAdd: PropTypes.func,
  whitelistAdd: PropTypes.func,
  whitelistRemove: PropTypes.func
};

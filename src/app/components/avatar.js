'use strict';

import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import { getAvatar } from '../utils';

class UserAvatar extends Component {
  render() {
    const { userId } = this.props;
    const { icon, color } = getAvatar(userId);
    return (
      <Avatar backgroundColor={color}>{icon}</Avatar>
    );
  }
}

UserAvatar.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserAvatar;
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import { fullWhite } from 'material-ui/styles/colors';
import { Component as HeaderMenu } from '../HeaderMenu';
import { formatDate } from '../../utils';

export default class RightHeader extends Component {
  render() {
    const { topic, online, logDate } = this.props;

    return (
      <AppBar
        className='right-header'
        title={null}
        iconElementLeft={
          <IconButton
            className='playlist-mode-switch'
            iconClassName='material-icons'
            onTouchTap={this.props.togglePlaylistMode}
          >queue_music</IconButton>
        }
        iconElementRight={
          <div>
            <IconButton
              iconClassName='material-icons'
              iconStyle={{ color: fullWhite }}
              onTouchTap={this.props.openSettings}
            >settings</IconButton>
            <HeaderMenu
              ignoreClear={this.props.ignoreClear}
              whitelistClear={this.props.whitelistClear}
              settings={this.props.settings}
            />
          </div>
        }
      >
        <div className='topic'>{logDate ? formatDate(logDate) : topic}</div>
        {
          !logDate && (
            <div className='online'>
              Онлайн: {online}
            </div>
          )
        }
      </AppBar>
    );
  }
}

RightHeader.propTypes = {
  topic: PropTypes.string.isRequired,
  online: PropTypes.string.isRequired,
  togglePlaylistMode: PropTypes.func.isRequired,
  ignoreClear: PropTypes.func.isRequired,
  whitelistClear: PropTypes.func.isRequired,
  openSettings: PropTypes.func.isRequired,
  logDate: PropTypes.instanceOf(Date),
  settings: PropTypes.object.isRequired
};

'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { fullWhite } from 'material-ui/styles/colors';
import { Component as HeaderMenu } from '../HeaderMenu';
import { formatDate } from '../../utils';

export default class RightHeader extends Component {
  render() {
    const { topic, online, logDate } = this.props;

    return (
      <AppBar
        className="right-header"
        title={null}
        iconElementLeft={
          <IconButton
            className="playlist-mode-switch"
            iconClassName="material-icons"
            tooltip="Плейлист"
            onTouchTap={this.props.togglePlaylistMode}>
            queue_music
          </IconButton>
        }
        iconElementRight={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton iconStyle={{ color: fullWhite }} href="https://t.me/tuzach" tooltip="Telegram" target='_blank'>
              <FontIcon className="fa fa-brands fa-telegram" />
            </IconButton>
            <IconButton
              iconClassName="material-icons"
              iconStyle={{ color: fullWhite }}
              tooltip="Настройки"
              onTouchTap={this.props.openSettings}>
              settings
            </IconButton>
            <HeaderMenu ignoreClear={this.props.ignoreClear} />
          </div>
        }>
        <div className="topic">{logDate ? formatDate(logDate) : topic}</div>
        {!logDate && <div className="online">Онлайн: {online}</div>}
      </AppBar>
    );
  }
}

RightHeader.propTypes = {
  topic: PropTypes.string.isRequired,
  online: PropTypes.string.isRequired,
  togglePlaylistMode: PropTypes.func.isRequired,
  ignoreClear: PropTypes.func.isRequired,
  openSettings: PropTypes.func.isRequired,
  logDate: PropTypes.instanceOf(Date),
};

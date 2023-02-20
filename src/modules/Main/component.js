'use strict';

import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import classnames from 'classnames';
import themes from '../../themes';
import { Component as LeftHeader } from '../LeftHeader';
import { Container as RightHeader } from '../RightHeader';
import { Container as Playlist } from '../Playlist';
import { Container as ChatContainer } from '../ChatContainer';
import { Container as Player } from '../Player';
import { Container as PostArea } from '../PostArea';
import { Container as Snackbar } from '../Snackbar';
import { Component as SidebarMenu } from '../SidebarMenu';
import { Container as ImageFeed } from '../ImageFeed';
import { Container as Lightbox } from '../Lightbox';
import { Container as Settings } from '../Settings';
import { Container as LogPicker } from '../LogPicker';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistMode: false,
      sidebarContent: 0,
      theme: localStorage.theme || 'light'
    };
  }

  componentDidMount() {
    if (navigator && navigator.splashscreen) {
      navigator.splashscreen.hide();
    }
  }

  setTheme(theme) {
    this.setState({ theme });
    localStorage.theme = theme;
  }

  setSidebarContent(content) {
    this.setState({
      sidebarContent: content
    });
  }

  togglePlaylistMode() {
    this.setState({
      playlistMode: !this.state.playlistMode
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(themes[this.state.theme])}>
        <div className={classnames('container', { 'playlist-mode': this.state.playlistMode }, this.state.theme)}>
          <div className='left'>
            <LeftHeader togglePlaylistMode={() => this.togglePlaylistMode()} playlistMode={this.state.playlistMode} />

            <Player theme={this.state.theme} />

            {this.state.sidebarContent === 0 ? <Playlist theme={this.state.theme} /> : null}
            {this.state.sidebarContent === 1 ? <ImageFeed /> : null}

            <SidebarMenu selected={this.state.sidebarContent} select={this.setSidebarContent.bind(this)} />
          </div>

          <div className='right'>
            <RightHeader togglePlaylistMode={() => this.togglePlaylistMode()} />
            <ChatContainer />
            <PostArea theme={this.state.theme} />
          </div>
          <Snackbar />
          <Lightbox />
          <Settings theme={this.state.theme} setTheme={this.setTheme.bind(this)} />
          <LogPicker />
        </div>
      </MuiThemeProvider>
    );
  }
}

/* global window */

'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import RefreshIncicator from 'material-ui/RefreshIndicator';
import { Component as Message } from '../Message';
import { Container as MessagePreview } from '../MessagePreview';
import { isMobile } from '../../utils';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.messageRefs = {};
    this.state = {
      selectedMessageId: null,
      showScrollDownButton: false
    };
    this.autoscroll = true;
    this.inactive = false;
    this.defaultTitle = document.title;
    this.unreadPosts = 0;
  }

  componentDidMount() {
    window.addEventListener('blur', () => (this.inactive = true));
    window.addEventListener('focus', () => {
      this.inactive = false;
      this.unreadPosts = 0;
      document.title = this.defaultTitle;
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.messages.length > prevProps.messages.length && !this.props.logMode) {
      if (this.inactive) {
        this.unreadPosts += this.props.messages.length - prevProps.messages.length;
        document.title = `[${this.unreadPosts}] ${this.defaultTitle}`;
      }
      if (this.autoscroll) {
        this.scrollbars.scrollToBottom();
      }
    }
  }

  onScroll() {
    if (this.props.logMode) return;
    const height = this.scrollbars.getScrollHeight() - this.scrollbars.getClientHeight();
    const diff = height - this.scrollbars.getScrollTop();
    this.autoscroll = (diff < 100);
    this.setState({ showScrollDownButton: diff > 500 });
  }

  gotoMessage(id) {
    const messageRef = this.messageRefs[id];
    if (!messageRef) {
      return;
    }

    const element = messageRef.ref;

    const docViewTop = this.scrollbars.getScrollTop();
    const docViewBottom = docViewTop + this.scrollbars.getClientHeight();
    const elemTop = element.offsetTop;
    const elemBottom = elemTop + element.offsetHeight;
    const visible = ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    if (!visible) {
      this.scrollbars.scrollTop(elemTop - 100);
    }
    this.setState({ selectedMessageId: id });
  }

  render() {
    const { messages, replies, logMode } = this.props;

    if (!messages.length) {
      return (
        <div className='chat' hidden={!this.props.isVisible}>
          <div className='spinner'>
            <RefreshIncicator
              top={0}
              left={0}
              status='loading'
            />
          </div>
        </div>
      );
    }

    const scrollDownButton = !this.state.showScrollDownButton ? null : (
      <FloatingActionButton
        mini
        onTouchTap={() => this.scrollbars.scrollToBottom()}
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16
        }}
      >
        <FontIcon className='material-icons'>keyboard_arrow_down</FontIcon>
      </FloatingActionButton>
    );

    return (
      <div className='chat' hidden={!this.props.isVisible}>
        <Scrollbars
          autoHide
          onScrollStop={this.onScroll.bind(this)}
          ref={ref => (this.scrollbars = ref)}
        >
          {
            messages.map(msg =>
              <Message
                myUserId={this.props.myUserId}
                whitelist={this.props.whitelist}
                message={msg}
                selected={this.state.selectedMessageId === msg.id}
                personal={msg.type === 'pvt'}
                key={msg.id}
                replies={replies[msg.id]}
                gotoMessage={this.gotoMessage.bind(this)}
                ref={ref => (this.messageRefs[msg.id] = ref)}
                showPreview={this.props.showPreview}
                hidePreview={this.props.hidePreview}
                ignoreAdd={this.props.ignoreAdd}
                whitelistAdd={this.props.whitelistAdd}
                whitelistRemove={this.props.whitelistRemove}
                control={this.props.control}
                settings={this.props.settings}
                logMode={logMode}
              />
            )
          }
        </Scrollbars>
        {scrollDownButton}
        {!isMobile() && <MessagePreview />}
      </div>
    );
  }
}

Chat.propTypes = {
  myUserId: PropTypes.string.isRequired,
  whitelist: PropTypes.array.isRequired,
  isVisible: PropTypes.bool.isRequired,
  messages: PropTypes.array.isRequired,
  replies: PropTypes.object.isRequired,
  logMode: PropTypes.bool.isRequired,
  showPreview: PropTypes.func.isRequired,
  hidePreview: PropTypes.func.isRequired,
  ignoreAdd: PropTypes.func.isRequired,
  whitelistAdd: PropTypes.func,
  whitelistRemove: PropTypes.func,
  control: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
};

'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import emitter from '../../emitter';
import {
  padTime
} from '../../utils';
import * as parser from '../../utils/messageParser';
import {
  isYoutube,
  getYoutubeId,
  getYoutubeTitle
} from '../../utils/youtube';
import { Component as MessageAvatar } from '../MessageAvatar';
import { Component as Attachment } from '../Attachment';

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedText: false,
      showReadMore: false,
      youtubeTitle: null
    };
    this.isYoutube = false;
  }

  componentDidMount() {
    if (this.messageTextRef.scrollHeight > this.messageTextRef.clientHeight) {
      this.setState({
        showReadMore: true
      });
    }

    if (this.isYoutube) {
      getYoutubeTitle(this.youtubeVideoId)
        .then(title => this.setState({ youtubeTitle: title }));
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { props } = this;
    return (
      this.state !== nextState ||
      props.selected !== nextProps.selected ||
      props.settings !== nextProps.settings ||
      (props.replies && props.replies.length) !== (nextProps.replies && nextProps.replies.length) ||
      props.message.id !== nextProps.message.id ||  // for preview message
      props.whitelist !== nextProps.whitelist
    );
  }

  toggleExpandText() {
    this.setState({
      expandedText: !this.state.expandedText
    });
  }

  movePreview(event) {
    const { clientX, clientY } = event;
    requestAnimationFrame(() => {
      emitter.emit('movePreview', clientX, clientY);
    });
  }

  reply(id, isPrivate) {
    if (this.props.logMode) return;
    const replyStr = isPrivate ? `!#${id}` : `@${id}`;
    emitter.emit('reply', replyStr);
  }

  render() {
    const { message, replies, selected, personal } = this.props;
    let { text } = message;
    const { id, user_id: userId, picture } = message;

    const time = new Date(message.time);
    const formattedTime = `${padTime(time.getHours())}:${padTime(time.getMinutes())}:${padTime(time.getSeconds())}`;

    this.isYoutube = isYoutube(text) && !picture;
    this.youtubeVideoId = getYoutubeId(text);

    const readMoreBlock = !this.state.showReadMore ? null : (
      <a href='' className='read-more' onClick={e => e.preventDefault()} onTouchTap={this.toggleExpandText.bind(this)} >
        {this.state.expandedText ? 'Скрыть' : 'Читать полностью'}
      </a>
    );

    const repliesBlock = !replies ? null : (
      <div className='replies'>
        Ответы:{
          replies.map(reply =>
            <a
              href=''
              key={reply}
              onClick={e => e.preventDefault()}
              onTouchTap={() => this.props.gotoMessage(reply)}
              onMouseEnter={() => this.props.showPreview(reply)}
              onMouseMove={this.movePreview}
              onMouseLeave={() => this.props.hidePreview()}
            >
              >>{reply}
            </a>
          )
        }
      </div>
    );

    text = parser.parseMarkup(text);
    text = parser.parseReplies(
      text,
      this.props.gotoMessage,
      this.props.showPreview,
      this.movePreview,
      this.props.hidePreview
    );
    if (this.state.youtubeTitle) {
      text = parser.replaceYoutubeLink(text, this.state.youtubeTitle);
    }
    text = parser.parseLinks(text);

    let whitelistAdd;
    let whitelistRemove;
    if (this.props.settings.personalChatEnabled && this.props.myUserId && this.props.whitelist) {
      if (this.props.myUserId !== userId && !this.props.whitelist.includes(userId)) {
        whitelistAdd = this.props.whitelistAdd;
      }

      if (this.props.whitelist.includes(userId)) {
        whitelistRemove = this.props.whitelistRemove;
      }
    }

    return (
      <div className={classnames('message', { selected, personal })} ref={ref => (this.ref = ref)}>
        <MessageAvatar
          logMode={this.props.logMode}
          message={message}
          control={this.props.control}
          ignoreAdd={this.props.ignoreAdd}
          whitelistAdd={whitelistAdd}
          whitelistRemove={whitelistRemove}
        />

        <div className='time'>{formattedTime}</div>

        <div className='id-wrapper'>
          <span
            className='id'
            onTouchTap={() => this.reply(id, personal)}
          >
            #{id}
          </span>
          {personal ? <span className='personal-flag'> [Личное сообщение]</span> : null}
        </div>

        <div
          className='text'
          ref={ref => (this.messageTextRef = ref)}
          style={{
            maxHeight: this.state.expandedText ? 'none' : null
          }}
        >
          {text}
        </div>

        {readMoreBlock}

        <Attachment message={message} settings={this.props.settings} />

        {repliesBlock}
      </div>
    );
  }
}

Message.propTypes = {
  myUserId: PropTypes.string,
  whitelist: PropTypes.array,
  message: PropTypes.object.isRequired,
  replies: PropTypes.array,
  gotoMessage: PropTypes.func,
  showPreview: PropTypes.func,
  hidePreview: PropTypes.func,
  ignoreAdd: PropTypes.func,
  whitelistAdd: PropTypes.func,
  whitelistRemove: PropTypes.func,
  control: PropTypes.func,
  selected: PropTypes.bool,
  personal: PropTypes.bool,
  settings: PropTypes.object.isRequired,
  logMode: PropTypes.bool
};

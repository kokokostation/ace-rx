import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText, CardHeader } from 'material-ui/Card';

import { COMMON_CHAT, PERSONAL_CHAT, CHAT_TABS } from './const';
import { Component as Chat } from '../Chat';
import { Container as ChatTabs } from '../ChatTabs';

function filterMessages(messages, replies, whitelist, myUserId) {
  if (whitelist.length === 0) {
    return { messages: [], replies: {} };
  }

  const resultMessages = messages.filter(item => [...whitelist, myUserId].includes(item.user_id));
  const resultMessageIds = new Set(resultMessages.map(item => item.id));
  const resultReplies = Object.fromEntries(
    Object.entries(replies)
      .map(([messageId, replyIds]) => [messageId, replyIds.filter(item => resultMessageIds.has(item))])
      .filter(([messageId, replyIds]) => replyIds.length > 0 && resultMessageIds.has(messageId))
  );

  return { messages: resultMessages, replies: resultReplies };
}


const ChatContainer = ({
  currentChat,
  whitelist,
  myUserId,
  messages,
  replies,
  logMode,
  showPreview,
  hidePreview,
  ignoreAdd,
  whitelistAdd,
  whitelistRemove,
  control,
  settings
}) => {
  const { messages: personalChatMessages, replies: personalChatReplies } = filterMessages(
    messages,
    replies,
    whitelist,
    myUserId
  );

  return (
    <div className='chat-container'>
      <div hidden={!settings.personalChatEnabled}>
        <ChatTabs tabs={CHAT_TABS} currentChat={currentChat} />
      </div>
      <Chat
        myUserId={myUserId}
        whitelist={whitelist}
        isVisible={!settings.personalChatEnabled || currentChat === COMMON_CHAT}
        messages={messages}
        replies={replies}
        logMode={logMode}
        showPreview={showPreview}
        hidePreview={hidePreview}
        ignoreAdd={ignoreAdd}
        whitelistAdd={whitelistAdd}
        whitelistRemove={whitelistRemove}
        control={control}
        settings={settings}
      />
      <Chat
        myUserId={myUserId}
        whitelist={whitelist}
        isVisible={settings.personalChatEnabled && currentChat === PERSONAL_CHAT && personalChatMessages.length > 0}
        messages={personalChatMessages}
        replies={personalChatReplies}
        logMode={logMode}
        showPreview={showPreview}
        hidePreview={hidePreview}
        ignoreAdd={ignoreAdd}
        whitelistAdd={whitelistAdd}
        whitelistRemove={whitelistRemove}
        control={control}
        settings={settings}
      />
      <div
        hidden={!(settings.personalChatEnabled && currentChat === PERSONAL_CHAT && personalChatMessages.length === 0)}
      >
        <Card className='empty-chat-card'>
          <CardHeader title='Здесь пока никого нет' />
          <CardText>Но можно добавить людей из общего чата, кликнув на их аватарку</CardText>
        </Card>
      </div>
    </div>
  );
};

ChatContainer.propTypes = {
  currentChat: PropTypes.string.isRequired,
  myUserId: PropTypes.string.isRequired,
  whitelist: PropTypes.array.isRequired,
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

export default ChatContainer;

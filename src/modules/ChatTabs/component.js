import React from 'react';
import PropTypes from 'prop-types';

import { Tabs, Tab } from 'material-ui/Tabs';

function ChatTabs({ tabs, chooseChat, currentChat }) {
  return (
    <Tabs className='chat-tabs' onChange={chooseChat} value={currentChat}>
      {
        tabs.map(({ code, label }, index) =>
          <Tab key={index} value={code} label={label} />
        )
      }
    </Tabs>
  );
}

ChatTabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  chooseChat: PropTypes.func.isRequired,
  currentChat: PropTypes.string.isRequired
};

export default ChatTabs;

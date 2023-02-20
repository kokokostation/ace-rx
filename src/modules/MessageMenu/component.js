'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import emitter from '../../emitter';

export default function MessageMenu(props) {
  const controls = !props.controls ? null : (
    <Menu
      onItemTouchTap={props.hidePopover}
      desktop
    >
      <Divider />
      <MenuItem
        primaryText='Delete'
        leftIcon={<FontIcon className='fa fa-trash' />}
        onTouchTap={() => props.control('delmsg', props.messageId)}
      />
      <MenuItem
        primaryText='Force delete' leftIcon={<FontIcon className='fa fa-eraser' />}
        onTouchTap={() => props.control('delmsgref', props.messageId)}
      />
      <MenuItem
        primaryText='Ban'
        leftIcon={<FontIcon className='fa fa-ban' />}
        onTouchTap={() => props.control('banchat', props.messageId)}
      />
      <MenuItem
        primaryText='IP'
        leftIcon={<FontIcon className='fa fa-search' />}
        onTouchTap={() => props.control('whois', props.messageId)}
      />
    </Menu>
  );

  return (
    <Popover
      open={props.open}
      anchorEl={props.anchorEl}
      anchorOrigin={{ horizontal: 'middle', vertical: 'center' }}
      targetOrigin={{ horizontal: 'left', vertical: 'top' }}
      canAutoPostion
      onRequestClose={props.hidePopover}
    >
      <Menu
        onItemTouchTap={props.hidePopover}
        desktop
      >
        <MenuItem
          primaryText='Ответ'
          leftIcon={<FontIcon className='fa fa-at' />}
          onTouchTap={() => emitter.emit('reply', `@${props.messageId}`)}
        />
        <MenuItem
          primaryText='Игнор'
          leftIcon={<FontIcon className='fa fa-minus-circle' />}
          onTouchTap={() => props.ignoreAdd(props.messageId)}
        />
        <MenuItem
          primaryText='Сообщение'
          leftIcon={<FontIcon className='fa fa-envelope' />}
          iconStyle={{
            fontSize: 20
          }}
          onTouchTap={() => emitter.emit('reply', `!#${props.messageId}`)}
        />
        {props.whitelistAdd && <MenuItem
          primaryText='В мой чат'
          leftIcon={<FontIcon className='fa fa-handshake-o' />}
          onTouchTap={() => props.whitelistAdd(props.messageId)}
        />}
        {props.whitelistRemove && <MenuItem
          primaryText='Из моего чата'
          leftIcon={<FontIcon className='fa fa-hand-o-right' />}
          onTouchTap={() => props.whitelistRemove(props.messageId)}
        />}
      </Menu>
      {controls}
    </Popover>
  );
}

MessageMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object,
  hidePopover: PropTypes.func.isRequired,
  controls: PropTypes.bool,
  messageId: PropTypes.string.isRequired,
  control: PropTypes.func,
  ignoreAdd: PropTypes.func,
  whitelistAdd: PropTypes.func,
  whitelistRemove: PropTypes.func
};

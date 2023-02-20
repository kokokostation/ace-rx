/* global VERSION */

'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import { fullWhite } from 'material-ui/styles/colors';
import emitter from '../../emitter';

export default function HeaderMenu(props) {
  return (
    <IconMenu
      iconButtonElement={
        <IconButton iconClassName='material-icons'>more_vert</IconButton>
      }
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      style={{ zIndex: 1 }}
      iconStyle={{ color: fullWhite }}
    >
      <MenuItem leftIcon={<FontIcon className='fa fa-question-circle' />} primaryText='FAQ' />
      <MenuItem leftIcon={<FontIcon className='fa fa-info-circle' />} primaryText='О проекте' />
      <MenuItem
        leftIcon={<FontIcon className='fa fa-history' />}
        onTouchTap={() => emitter.emit('openLogPicker')}
        primaryText='Логи чата'
      />
      <Divider />
      <MenuItem
        leftIcon={<FontIcon className='fa fa-bug' />}
        href='http://tuzach.reformal.ru'
        target='_blank'
        primaryText='Баги и идеи'
      />
      <MenuItem
        leftIcon={<FontIcon className='fa fa-github' />}
        href='https://github.com/svmn/ace-rx'
        target='_blank'
        primaryText='Исходники'
      />
      <MenuItem
        leftIcon={<FontIcon className='fa fa-vk' />}
        href='https://vk.com/tuzach_in'
        target='_blank'
        primaryText='Паблик VK'
      />
      <Divider />
      <MenuItem
        leftIcon={<FontIcon className='material-icons'>clear_all</FontIcon>}
        primaryText='Очистить игнор-лист'
        onTouchTap={props.ignoreClear}
      />
      {props.settings.personalChatEnabled && <MenuItem
        leftIcon={<FontIcon className='fa fa-hand-stop-o' />}
        primaryText='Очистить мой чат'
        onTouchTap={props.whitelistClear}
      />}
      <Divider />
      <MenuItem
        primaryText='Версия'
        secondaryText={VERSION}
      />
    </IconMenu>
  );
}

HeaderMenu.propTypes = {
  ignoreClear: PropTypes.func.isRequired,
  whitelistClear: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
};

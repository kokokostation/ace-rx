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
        <IconButton iconClassName="material-icons" tooltip="Еще">
          more_vert
        </IconButton>
      }
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      style={{ zIndex: 1 }}
      iconStyle={{ color: fullWhite }}
    >
      {/* <MenuItem leftIcon={<FontIcon className='fa fa-question-circle' />} primaryText='FAQ' /> */}
      {/* <MenuItem leftIcon={<FontIcon className='fa fa-info-circle' />} primaryText='О проекте' /> */}
      <MenuItem
        leftIcon={<FontIcon className="fa fa-history" />}
        onTouchTap={() => emitter.emit('openLogPicker')}
        primaryText="Логи чата"
      />
      <Divider />
      <MenuItem
        leftIcon={<FontIcon className="fa fa-bug" />}
        href="http://tuzach.reformal.ru"
        target="_blank"
        primaryText="Баги и идеи"
      />
      <MenuItem
        leftIcon={<FontIcon className="fa fa-github" />}
        href="https://github.com/svmn/ace-rx"
        target="_blank"
        primaryText="Исходники"
      />
      <MenuItem
        leftIcon={<FontIcon className="material-icons">mail</FontIcon>}
        href="mailto:root@tuzach.in"
        primaryText="Написать на почту"
      />
      <Divider />
      <MenuItem
        leftIcon={<FontIcon className="material-icons">clear_all</FontIcon>}
        primaryText="Очистить игнор-лист"
        onTouchTap={props.ignoreClear}
      />
      <Divider />
      <MenuItem disabled primaryText="Версия" secondaryText={VERSION} />
    </IconMenu>
  );
}

HeaderMenu.propTypes = {
  ignoreClear: PropTypes.func.isRequired,
};

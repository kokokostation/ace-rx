'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';

export default function Settings(props, context) {
  const actions = (
    <FlatButton
      label='Закрыть'
      primary
      onTouchTap={props.close}
    />
  );

  const dividerStyle = {
    marginTop: 16,
    marginBottom: 16
  };

  const checkboxStyle = {
    display: 'inline-block',
    width: 'initial',
    marginRight: 16
  };

  return (
    <Dialog
      open={props.isOpen}
      onRequestClose={props.close}
      title='Настройки'
      actions={actions}
      contentStyle={{
        maxWidth: 600
      }}
      titleStyle={{
        backgroundColor: context.muiTheme.appBar.color,
        color: context.muiTheme.appBar.textColor,
        marginBottom: 20
      }}
    >
      <Toggle
        label='Темный фон'
        toggled={props.theme === 'dark'}
        onToggle={(event, value) => {
          props.setTheme(value ? 'dark' : 'light');
        }}
      />

      <Toggle
        label='Мой чат'
        toggled={props.personalChatEnabled}
        onToggle={(event, isToggled) => {
          props.set('personalChatEnabled', isToggled);
        }}
      />

      <Divider style={dividerStyle} />

      <RadioButtonGroup
        name='postingMode'
        valueSelected={props.postingMode}
        onChange={(event, value) => props.set('postingMode', value)}
      >
        <RadioButton
          value='inverse'
          label={
            <div>
              <b>Enter</b> - Отправка сообщения, <b>Shift + Enter</b> - Перенос строки
            </div>
          }
        />
        <RadioButton
          value='natural'
          label={
            <div><b>Ctrl + Enter</b> - Отправка сообщения, <b>Enter</b> - Перенос строки
            </div>
          }
        />
      </RadioButtonGroup>

      <Divider style={dividerStyle} />

      <div>
        <Checkbox
          style={checkboxStyle}
          label='Картинки'
          checked={props.showImages}
          onCheck={(event, isChecked) => props.set('showImages', isChecked)}
        />
        <Checkbox
          style={checkboxStyle}
          label='Youtube'
          checked={props.showYoutube}
          onCheck={(event, isChecked) => props.set('showYoutube', isChecked)}
        />
        <Checkbox
          style={checkboxStyle}
          label='Webm'
          checked={props.showWebm}
          onCheck={(event, isChecked) => props.set('showWebm', isChecked)}
        />
      </div>
    </Dialog>
  );
}

Settings.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired,
  set: PropTypes.func.isRequired,
  postingMode: PropTypes.string.isRequired,
  showImages: PropTypes.bool.isRequired,
  showYoutube: PropTypes.bool.isRequired,
  showWebm: PropTypes.bool.isRequired,
  personalChatEnabled: PropTypes.bool.isRequired
};

Settings.contextTypes = {
  muiTheme: PropTypes.object.isRequired
};


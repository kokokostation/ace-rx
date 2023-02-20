'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';
import emitter from '../../emitter';

export default class LogPicker extends Component {
  componentDidMount() {
    emitter.on('openLogPicker', () => this.ref.show());
  }

  render() {
    return (
      <DatePickerDialog
        ref={ref => (this.ref = ref)}
        DateTimeFormat={Intl.DateTimeFormat}
        firstDayOfWeek={1}
        okLabel='Показать'
        cancelLabel='Закрыть'
        locale='ru-RU'
        minDate={new Date(2012, 0, 29)}
        maxDate={new Date()}
        onAccept={this.props.load}
      />
    );
  }
}

LogPicker.propTypes = {
  load: PropTypes.func.isRequired
};

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  DateLocalizer,
  momentLocalizer,
  globalizeLocalizer,
  move,
  Views,
  Navigate,
  components
} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

const TrackerCalendar = props => {
  const [eventsState, setEventsState] = useState([]);

  // useEffect(() => {});

  const myEventsList = [
    // {
    //   title: 'Test',
    //   start: Date.now(),
    //   allDay: true
    // }
  ];

  const handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name');
    if (title)
      setEventsState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title
          }
        ]
      });
  };

  return (
    <div style={{ height: '100vh' }}>
      <Calendar
        selectable
        localizer={localizer}
        events={myEventsList}
        startAccessor='start'
        endAccessor='end'
        defaultView={Views.MONTH}
        onSelectSlot={handleSelect}
      />
    </div>
  );
};

export default TrackerCalendar;

import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import './Events.css'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Events = () => {
  const events = [
    { start: new Date(), end: new Date(), title: 'Post video' },
    { start: new Date(), end: new Date(), title: 'Edit video' },
    { start: new Date(), end: new Date(), title: 'Code' },
  ];

  return (
    <section id="Events" className="events-section">
      <h1 className="events-text">Events</h1>
      <div className="calendar-js">
        <Calendar
          localizer={localizer}
          events={events}
          views={['month']} // Show only the month view
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    </section>
  );
};

export default Events;

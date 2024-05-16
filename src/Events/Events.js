import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import './Events.css'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Events = () => {

    const recurringThursdays = [];
    const startDate = moment().startOf('week').add(4, 'days'); // Start from this week's Thursday
    for (let i = 0; i < 365; i++) {
      recurringThursdays.push({
        start: startDate.clone().add(i, 'weeks').toDate(),
        end: startDate.clone().add(i, 'weeks').toDate(),
        title: 'Annadaanam',
      });
    }

  const otherEvents = [
    { start: new Date(), end: new Date(), title: 'Post video' },
    { start: new Date(), end: new Date(), title: 'Edit video' },
    { start: new Date(), end: new Date(), title: 'Code' },
  ];

  const allEvents = [...recurringThursdays, ...otherEvents];

  // Custom dayPropGetter function
  const customDayPropGetter = (date) => {
    const dayOfWeek = moment(date).day(); // 0 (Sunday) to 6 (Saturday)
    const isThursday = dayOfWeek === 4; // Thursday is the 4th day of the week

    if (isThursday) {
      return {
        style: {
          backgroundColor: 'rgb(250, 140, 10)',
        },
      };
    }

    return {}; // Return an empty object for other days
  };


  return (
    <section id="Events" className="events-section">
      <h1 className="events-text">Events</h1>
      <div className="calendar-js">
        <Calendar
          localizer={localizer}
          events={allEvents}
          views={['month']} // Show only the month view
          startAccessor="start"
          endAccessor="end"
          dayPropGetter={customDayPropGetter} // Apply the custom styling
        />
      </div>
    </section>
  );
};

export default Events;

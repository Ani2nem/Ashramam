import React from 'react';
import './Events.css';
import { Inject, ScheduleComponent, Day, Week, Month, Agenda} from '@syncfusion/ej2-react-schedule';

const Events = () => {
        return (
            <section id="Events" className="events-section">
                <h1 className="events-text">Events</h1>
                <div className='scheduler'>
                <ScheduleComponent currentView='Month' >
                    <Inject services={[Day, Week, Month, Agenda]}/>
                </ScheduleComponent>    
                </div>
                
           </section>
        );
    }

export default Events;

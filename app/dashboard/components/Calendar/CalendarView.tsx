import React from 'react';
import FullCalendar from '@fullcalendar/react';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'; // For Month View
import timeGridPlugin from '@fullcalendar/timegrid'; // For Week and Day View
import interactionPlugin from '@fullcalendar/interaction'; // For Drag and Drop

interface CalendarViewProps {
  currentView: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay';
  events: EventInput[];
  setEvents: React.Dispatch<React.SetStateAction<EventInput[]>>;
}

const CalendarView: React.FC<CalendarViewProps> = ({ currentView, events, setEvents }) => {
  const handleDateClick = (arg: any) => {
    const title = prompt('Enter event title:');
    if (title) {
      const newEvent = { title, start: arg.dateStr };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
  };

  const handleEventClick = (clickInfo: any) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'?`)) {
      // Use FullCalendar API to remove the event
      clickInfo.event.remove();

      // Update state to reflect the change
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.title !== clickInfo.event.title || event.start !== clickInfo.event.start)
      );
    }
  };

  return (
    <FullCalendar
      key={currentView} // Forces re-render when the view changes
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView={currentView}
      events={events}
      dateClick={handleDateClick}
      eventClick={handleEventClick}
      editable={true}
      selectable={true}
    />
  );
};

export default CalendarView;

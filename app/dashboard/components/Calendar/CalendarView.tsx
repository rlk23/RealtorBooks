import React from 'react';
import FullCalendar from '@fullcalendar/react';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

interface CalendarViewProps {
  currentView: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay';
  events: EventInput[];
  setEvents: React.Dispatch<React.SetStateAction<EventInput[]>>;
  handleDateClick: (arg: any) => void;
  handleEventClick: (clickInfo: any) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  currentView,
  events,
  handleDateClick,
  handleEventClick,
}) => {
  return (
    <FullCalendar
      key={currentView}
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

"use client";
import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import { EventInput } from '@fullcalendar/core';
import CalendarView from './CalendarView';
import EventButtons from './EventButtons';

const CalendarComponent = () => {
  const [currentView, setCurrentView] = useState<'dayGridMonth' | 'timeGridWeek' | 'timeGridDay'>('dayGridMonth');
  const [events, setEvents] = useState<EventInput[]>([
    { title: 'Event 1', start: new Date().toISOString() },
    { title: 'Event 2', start: new Date().toISOString(), end: new Date().toISOString() },
    { title: 'Event 3', start: new Date().toISOString(), end: new Date().toISOString() }
  ]);

  const handleViewChange = (view: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay') => {
    setCurrentView(view);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
        <EventButtons onChangeView={handleViewChange} />
      </Box>
      <CalendarView currentView={currentView} events={events} setEvents={setEvents} />
    </Container>
  );
};

export default CalendarComponent;

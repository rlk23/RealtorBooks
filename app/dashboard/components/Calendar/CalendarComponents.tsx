"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Container, Box, Button } from '@mui/material';
import { EventInput } from '@fullcalendar/core';
import CalendarView from './CalendarView';
import EventButtons from './EventButtons';
import EventDialog from './EventDialog';
import EditEventDialog from './EditEventDialog'; // Import the EditEventDialog
import dayjs, { Dayjs } from 'dayjs';

const CalendarComponent = () => {
  const { data: session } = useSession(); // Get the session data
  const [currentView, setCurrentView] = useState<'dayGridMonth' | 'timeGridWeek' | 'timeGridDay'>('dayGridMonth');
  const [events, setEvents] = useState<EventInput[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // API functions
  const addEvent = async (newEvent: EventInput) => {
    try {
      if (!session?.user?.id) {
        console.error('User is not authenticated.');
        return;
      }

      const response = await axios.post('/api/calendar', {
        ...newEvent,
        userId: session.user.id,
      });
      console.log('Event added successfully:', response.data);
      setEvents((prevEvents) => [...prevEvents, response.data]);
    } catch (error) {
      console.error('Error adding event:', error.response ? error.response.data : error.message);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/calendar');
      const eventsWithIds = response.data.map((event: any) => ({
        ...event,
        id: event._id, // Map `_id` from MongoDB to `id` for FullCalendar
      }));
      setEvents(eventsWithIds);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const updateEvent = async (id: string, updatedEvent: EventInput) => {
    try {
      await axios.put(`/api/calendar/${id}`, updatedEvent);
      fetchEvents(); // Refresh the event list after updating
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      console.log('Deleting event with ID:', id); // For debugging
      await axios.delete(`/api/calendar/${id}`);
      fetchEvents(); // Refresh the event list after deletion
    } catch (error) {
      console.error('Error deleting event:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleViewChange = (view: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay') => {
    setCurrentView(view);
  };

  const handleDateClick = () => {
    setIsDialogOpen(true);
  };

  const handleEventClick = (clickInfo: any) => {
    const eventId = clickInfo.event.id || clickInfo.event.extendedProps._id;
    const start = dayjs(clickInfo.event.start);
    const end = dayjs(clickInfo.event.end || start.add(1, 'hour'));
  
    if (eventId) {
      setSelectedEvent({
        id: eventId,
        title: clickInfo.event.title,
        start,
        end,
      });
      setIsEditDialogOpen(true);
    } else {
      console.error('Event ID is missing.');
    }
  };

  const handleAddEvent = (eventData: { title: string; start: any; end?: any }) => {
    const newEvent = {
      title: eventData.title,
      start: eventData.start.toISOString(),
      end: eventData.end ? eventData.end.toISOString() : undefined,
    };
    addEvent(newEvent);
  };

  const handleEditEvent = (updatedEvent: { id: string; title: string; start: any; end?: any }) => {
    const eventToUpdate = {
      title: updatedEvent.title,
      start: updatedEvent.start.toISOString(),
      end: updatedEvent.end ? updatedEvent.end.toISOString() : undefined,
    };
    updateEvent(updatedEvent.id, eventToUpdate);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
        <EventButtons onChangeView={handleViewChange} />
        <Button variant="contained" color="primary" onClick={() => setIsDialogOpen(true)}>
          Add Event
        </Button>
      </Box>
      <CalendarView
        currentView={currentView}
        events={events}
        setEvents={setEvents}
        handleDateClick={handleDateClick}
        handleEventClick={handleEventClick}
      />
      <EventDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAddEvent={handleAddEvent}
      />
      {selectedEvent && (
        <EditEventDialog
          open={isEditDialogOpen}
          event={selectedEvent}
          onClose={() => setIsEditDialogOpen(false)}
          onUpdateEvent={handleEditEvent}
          onDeleteEvent={deleteEvent}
        />
      )}
    </Container>
  );
};

export default CalendarComponent;

"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Container, Box } from '@mui/material';
import { EventInput } from '@fullcalendar/core';
import CalendarView from './CalendarView';
import EventButtons from './EventButtons';

const CalendarComponent = () => {
  const { data: session } = useSession(); // Get the session data
  const [currentView, setCurrentView] = useState<'dayGridMonth' | 'timeGridWeek' | 'timeGridDay'>('dayGridMonth');
  const [events, setEvents] = useState<EventInput[]>([]);

  // API functions
  const addEvent = async (newEvent: EventInput) => {
    try {
      // Ensure user is logged in before attempting to add an event
      if (!session?.user?.id) {
        console.error('User is not authenticated.');
        return;
      }

      // Include userId when sending the request
      const response = await axios.post('/api/calendar', {
        ...newEvent,
        userId: session.user.id, // Pass the userId to the backend
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
  
  

  // Fetch events when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleViewChange = (view: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay') => {
    setCurrentView(view);
  };

  const handleDateClick = (arg: any) => {
    const title = prompt('Enter event title:');
    if (title) {
      const newEvent = { title, start: arg.dateStr };
      addEvent(newEvent); // Add the new event to the database
    }
  };

  const handleEventClick = (clickInfo: any) => {
    const eventId = clickInfo.event.id;
  
    if (eventId && window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'?`)) {
      deleteEvent(eventId);
    } else {
      console.error('Event ID is missing.');
    }
  };
  
  

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
        <EventButtons onChangeView={handleViewChange} />
      </Box>
      <CalendarView
        currentView={currentView}
        events={events}
        setEvents={setEvents}
        handleDateClick={handleDateClick}
        handleEventClick={handleEventClick}
      />
    </Container>
  );
};

export default CalendarComponent;

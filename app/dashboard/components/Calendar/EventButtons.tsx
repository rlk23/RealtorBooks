import React from 'react';
import { Button, ButtonGroup } from '@mui/material';

interface EventButtonsProps {
  onChangeView: (view: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay') => void;
}

const EventButtons: React.FC<EventButtonsProps> = ({ onChangeView }) => {
  return (
    <ButtonGroup variant="contained">
      <Button onClick={() => onChangeView('dayGridMonth')}>Month View</Button>
      <Button onClick={() => onChangeView('timeGridWeek')}>Week View</Button>
      <Button onClick={() => onChangeView('timeGridDay')}>Day View</Button>
    </ButtonGroup>
  );
};

export default EventButtons;

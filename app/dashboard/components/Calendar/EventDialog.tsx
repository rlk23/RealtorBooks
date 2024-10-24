import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

interface EventDialogProps {
  open: boolean;
  onClose: () => void;
  onAddEvent: (event: { title: string; start: Dayjs; end: Dayjs }) => void;
}

const EventDialog: React.FC<EventDialogProps> = ({ open, onClose, onAddEvent }) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState<Dayjs | null>(dayjs());
  const [end, setEnd] = useState<Dayjs | null>(dayjs().add(1, 'hour')); // Default to 1 hour after the start time

  const handleAddEvent = () => {
    if (title && start && end) {
      onAddEvent({ title, start, end });
      onClose();
      setTitle('');
      setStart(dayjs());
      setEnd(dayjs().add(1, 'hour'));
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Event</DialogTitle>
      <DialogContent>
        <TextField
          label="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Start Time"
            value={start}
            onChange={(newValue) => setStart(newValue)}
            slotProps={{ textField: { margin: 'normal', fullWidth: true } }}
          />
          <TimePicker
            label="End Time"
            value={end}
            onChange={(newValue) => setEnd(newValue)}
            slotProps={{ textField: { margin: 'normal', fullWidth: true } }}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddEvent} variant="contained" color="primary">
          Add Event
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventDialog;

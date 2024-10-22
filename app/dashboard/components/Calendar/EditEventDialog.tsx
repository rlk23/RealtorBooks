import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

interface EditEventDialogProps {
  open: boolean;
  event: { id: string; title: string; start: Dayjs; end: Dayjs };
  onClose: () => void;
  onUpdateEvent: (event: { id: string; title: string; start: Dayjs; end: Dayjs }) => void;
  onDeleteEvent: (id: string) => void;
}

const EditEventDialog: React.FC<EditEventDialogProps> = ({
  open,
  event,
  onClose,
  onUpdateEvent,
  onDeleteEvent,
}) => {
  const [title, setTitle] = useState(event.title);
  const [start, setStart] = useState<Dayjs | null>(event.start);
  const [end, setEnd] = useState<Dayjs | null>(event.end);

  const handleUpdateEvent = () => {
    if (title && start && end) {
      onUpdateEvent({ id: event.id, title, start, end });
      onClose();
    }
  };

  const handleDeleteEvent = () => {
    if (window.confirm(`Are you sure you want to delete the event "${event.title}"?`)) {
      onDeleteEvent(event.id);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Event</DialogTitle>
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
        <Button onClick={handleDeleteEvent} color="secondary">
          Delete
        </Button>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdateEvent} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEventDialog;

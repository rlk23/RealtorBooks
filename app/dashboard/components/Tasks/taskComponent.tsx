"use client";
import React, { useState } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Stack,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

interface Task {
  id: number;
  name: string;
  deadline: string | null;
}

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: 'Invite team members', deadline: '2024-03-19' },
    { id: 2, name: 'Add a new task', deadline: '2024-02-27' },
  ]);

  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDeadline, setNewTaskDeadline] = useState<Dayjs | null>(null);

  const handleAddTask = () => {
    if (newTaskName && newTaskDeadline) {
      const newTask: Task = {
        id: tasks.length + 1,
        name: newTaskName,
        deadline: newTaskDeadline.format('YYYY-MM-DD'), // Convert Dayjs to string
      };
      setTasks([...tasks, newTask]);
      setNewTaskName('');
      setNewTaskDeadline(null);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Tasks
      </Typography>

      {/* Task Table */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task ID</TableCell>
              <TableCell>Task Name</TableCell>
              <TableCell>Deadline</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.deadline}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add New Task Form */}
      <Stack direction="row" spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
        <TextField
          label="Task Name"
          variant="outlined"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Deadline"
            value={newTaskDeadline}
            onChange={(date) => setNewTaskDeadline(date)}
          />
        </LocalizationProvider>
        <Button variant="contained" color="primary" onClick={handleAddTask}>
          Add Task
        </Button>
      </Stack>
    </Container>
  );
}

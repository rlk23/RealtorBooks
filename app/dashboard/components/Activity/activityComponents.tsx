"use client";
import React, { useState } from 'react';
import {
  Container,
  Typography,
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
  Grid,
  Card,
  CardContent,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary chart.js components
Chart.register(ArcElement, Tooltip, Legend);

// Define the FinanceLog interface
interface FinanceLog {
  id: number;
  type: 'Earning' | 'Expense';
  description: string;
  amount: number;
  date: string;
}

export default function FinancePage() {
  // State to manage financial logs
  const [logs, setLogs] = useState<FinanceLog[]>([
    { id: 1, type: 'Earning', description: 'Freelance Work', amount: 500, date: '2024-09-01' },
    { id: 2, type: 'Expense', description: 'Office Supplies', amount: 100, date: '2024-09-05' },
  ]);

  // State to manage new log input
  const [newLog, setNewLog] = useState<Partial<FinanceLog>>({
    type: 'Earning',
    description: '',
    amount: undefined,
    date: '',
  });

  // Calculate total earnings, expenses, and balance
  const totalEarnings = logs
    .filter((log) => log.type === 'Earning')
    .reduce((total, log) => total + log.amount, 0);
  const totalExpenses = logs
    .filter((log) => log.type === 'Expense')
    .reduce((total, log) => total + log.amount, 0);
  const totalBalance = totalEarnings - totalExpenses;

  // Handler to add a new financial log
  const handleAddLog = () => {
    if (newLog.description && newLog.amount && newLog.date) {
      const newLogWithId = {
        ...newLog,
        id: logs.length + 1,
      } as FinanceLog;
      setLogs([...logs, newLogWithId]);
      setNewLog({
        type: 'Earning',
        description: '',
        amount: undefined,
        date: '',
      });
    }
  };

  // Data for the Doughnut chart
  const data = {
    labels: ['Earnings', 'Expenses'],
    datasets: [
      {
        label: 'Financial Overview',
        data: [totalEarnings, totalExpenses],
        backgroundColor: ['#4caf50', '#f44336'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Financial Activity
      </Typography>

      {/* Overview Section */}
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Earnings</Typography>
              <Typography variant="h5" color="success.main">
                ${totalEarnings}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Expenses</Typography>
              <Typography variant="h5" color="error.main">
                ${totalExpenses}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Balance</Typography>
              <Typography variant="h5" color={totalBalance >= 0 ? 'success.main' : 'error.main'}>
                ${totalBalance}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Financial Chart */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Card sx={{ width: 400, padding: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Financial Overview
            </Typography>
            <Doughnut data={data} />
          </CardContent>
        </Card>
      </Box>

      {/* Logs Table */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Financial Logs
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount ($)</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.id}</TableCell>
                <TableCell>{log.type}</TableCell>
                <TableCell>{log.description}</TableCell>
                <TableCell>{log.amount}</TableCell>
                <TableCell>{log.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add New Log Form */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Add New Financial Log
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={newLog.type}
            label="Type"
            onChange={(e) => setNewLog({ ...newLog, type: e.target.value as 'Earning' | 'Expense' })}
          >
            <MenuItem value="Earning">Earning</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Description"
          variant="outlined"
          value={newLog.description}
          onChange={(e) => setNewLog({ ...newLog, description: e.target.value })}
          fullWidth
        />
        <TextField
          label="Amount ($)"
          type="number"
          variant="outlined"
          value={newLog.amount || ''}
          onChange={(e) => setNewLog({ ...newLog, amount: Number(e.target.value) })}
          fullWidth
        />
        <TextField
          label="Date"
          type="date"
          variant="outlined"
          value={newLog.date || ''}
          onChange={(e) => setNewLog({ ...newLog, date: e.target.value })}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleAddLog}>
          Add Log
        </Button>
      </Stack>
    </Container>
  );
}

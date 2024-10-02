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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';

interface Client {
  id: number;
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  property: string;
  monthlyRent: number;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      name: 'John Doe',
      age: 30,
      gender: 'Male',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      property: 'Apartment A1',
      monthlyRent: 1200,
    },
  ]);

  const [newClient, setNewClient] = useState<Partial<Client>>({
    name: '',
    age: undefined,
    gender: '',
    email: '',
    phone: '',
    property: '',
    monthlyRent: undefined,
  });

  const handleAddClient = () => {
    if (
      newClient.name &&
      newClient.age &&
      newClient.gender &&
      newClient.email &&
      newClient.phone &&
      newClient.property &&
      newClient.monthlyRent
    ) {
      const newClientWithId = {
        ...newClient,
        id: clients.length + 1,
      } as Client;
      setClients([...clients, newClientWithId]);
      setNewClient({
        name: '',
        age: undefined,
        gender: '',
        email: '',
        phone: '',
        property: '',
        monthlyRent: undefined,
      });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Client Management
      </Typography>

      {/* Client Table */}
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Client ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Property</TableCell>
              <TableCell>Monthly Rent ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.id}</TableCell>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.age}</TableCell>
                <TableCell>{client.gender}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{client.property}</TableCell>
                <TableCell>{client.monthlyRent}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add New Client Form */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Add New Client
      </Typography>
      <Stack spacing={3} sx={{ mt: 2 }}>
        <TextField
          label="Name"
          variant="outlined"
          value={newClient.name}
          onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
          fullWidth
        />
        <TextField
          label="Age"
          type="number"
          variant="outlined"
          value={newClient.age || ''}
          onChange={(e) => setNewClient({ ...newClient, age: Number(e.target.value) })}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Gender</InputLabel>
          <Select
            value={newClient.gender}
            label="Gender"
            onChange={(e) => setNewClient({ ...newClient, gender: e.target.value })}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          value={newClient.email}
          onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
          fullWidth
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          value={newClient.phone}
          onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
          fullWidth
        />
        <TextField
          label="Property"
          variant="outlined"
          value={newClient.property}
          onChange={(e) => setNewClient({ ...newClient, property: e.target.value })}
          fullWidth
        />
        <TextField
          label="Monthly Rent ($)"
          type="number"
          variant="outlined"
          value={newClient.monthlyRent || ''}
          onChange={(e) => setNewClient({ ...newClient, monthlyRent: Number(e.target.value) })}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleAddClient}>
          Add Client
        </Button>
      </Stack>
    </Container>
  );
}

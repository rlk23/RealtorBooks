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
  IconButton,
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';

interface Client {
  id: number;
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  property: string;
  monthlyRent: number;
  documents: File[]; // Add documents array for file uploads
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
      documents: [], // Initially no documents
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
    documents: [], // Initialize empty array for new client documents
  });

  // Handler to add a new client
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
        documents: [],
      });
    }
  };

  // Handler to handle file uploads
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, clientId?: number) => {
    const files = event.target.files;
    if (files) {
      if (clientId) {
        // Add files to the client by ID
        setClients((prevClients) =>
          prevClients.map((client) =>
            client.id === clientId
              ? { ...client, documents: [...client.documents, ...Array.from(files)] }
              : client
          )
        );
      } else {
        // Add files to the new client before saving
        setNewClient({ ...newClient, documents: [...(newClient.documents || []), ...Array.from(files)] });
      }
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
              <TableCell>Documents</TableCell>
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
                <TableCell>
                  {/* File Upload button */}
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleFileUpload(e, client.id)}
                    hidden
                    id={`file-upload-${client.id}`}
                  />
                  <label htmlFor={`file-upload-${client.id}`}>
                    <IconButton component="span">
                      <AttachFileIcon />
                    </IconButton>
                  </label>

                  {/* List of uploaded documents with clickable links */}
                  {client.documents.length > 0 && (
                    <ul>
                      {client.documents.map((file, index) => {
                        const fileUrl = URL.createObjectURL(file);
                        return (
                          <li key={index}>
                            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                              {file.name}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </TableCell>
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

        {/* File Upload for New Client */}
        <input type="file" multiple onChange={handleFileUpload} hidden id="file-upload-new-client" />
        <label htmlFor="file-upload-new-client">
          <Button component="span" variant="contained" color="secondary">
            Upload Documents
          </Button>
        </label>

        <Button variant="contained" color="primary" onClick={handleAddClient}>
          Add Client
        </Button>
      </Stack>
    </Container>
  );
}

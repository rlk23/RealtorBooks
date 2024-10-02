"use client";
import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Avatar,
  TextField,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from '@mui/material';

const SettingsComponents = () => {
  const [activeSection, setActiveSection] = useState("Profile Information");

  // Render the content based on the selected section
  const renderSectionContent = () => {
    switch (activeSection) {
      case "Profile Information":
        return (
          <Box component={Paper} sx={{ p: 4, flexGrow: 1 }}>
            <Typography variant="h5" gutterBottom>
              Profile Information
            </Typography>
            <Divider sx={{ mb: 4 }} />

            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
              <Avatar sx={{ width: 80, height: 80 }}>J</Avatar>
              <Button variant="outlined">Upload Photo</Button>
            </Stack>

            <Stack spacing={3}>
              <TextField label="Display Name" fullWidth variant="outlined" defaultValue="Jane" />
              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                defaultValue="jsmith.mobbin2@gmail.com"
              />
              <FormControl fullWidth>
                <InputLabel>Country of Residence</InputLabel>
                <Select defaultValue="United States" label="Country of Residence">
                  <MenuItem value="United States">United States</MenuItem>
                  <MenuItem value="Canada">Canada</MenuItem>
                  <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>State of Residence</InputLabel>
                <Select defaultValue="California" label="State of Residence">
                  <MenuItem value="California">California</MenuItem>
                  <MenuItem value="Texas">Texas</MenuItem>
                  <MenuItem value="New York">New York</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Postcode of Residence"
                fullWidth
                variant="outlined"
                defaultValue="94025"
              />
              <Button variant="contained" color="primary" sx={{ alignSelf: 'flex-start' }}>
                Save
              </Button>
            </Stack>
          </Box>
        );
      case "Account":
        return (
          <Box component={Paper} sx={{ p: 4, flexGrow: 1 }}>
            <Typography variant="h5" gutterBottom>
              Account Settings
            </Typography>
            <Divider sx={{ mb: 4 }} />
            <Stack spacing={3}>
              <TextField label="Username" fullWidth variant="outlined" defaultValue="JaneSmith" />
              <TextField
                label="Change Password"
                type="password"
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
                variant="outlined"
              />
              <Button variant="contained" color="primary" sx={{ alignSelf: 'flex-start' }}>
                Save Changes
              </Button>
            </Stack>
          </Box>
        );
      case "Email Notifications":
        return (
          <Box component={Paper} sx={{ p: 4, flexGrow: 1 }}>
            <Typography variant="h5" gutterBottom>
              Email Notifications
            </Typography>
            <Divider sx={{ mb: 4 }} />
            <Stack spacing={3}>
              <FormControl fullWidth>
                <InputLabel>Notification Preferences</InputLabel>
                <Select defaultValue="All">
                  <MenuItem value="All">Receive All Notifications</MenuItem>
                  <MenuItem value="Important">Receive Only Important Notifications</MenuItem>
                  <MenuItem value="None">Do Not Receive Notifications</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" color="primary" sx={{ alignSelf: 'flex-start' }}>
                Save
              </Button>
            </Stack>
          </Box>
        );
      case "Memberships":
        return (
          <Box component={Paper} sx={{ p: 4, flexGrow: 1 }}>
            <Typography variant="h5" gutterBottom>
              Memberships
            </Typography>
            <Divider sx={{ mb: 4 }} />
            <Stack spacing={3}>
              <Typography variant="body1">
                Current Membership Level: <strong>Premium</strong>
              </Typography>
              <Button variant="outlined" color="secondary">
                Cancel Membership
              </Button>
            </Stack>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', mt: 4 }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 240,
          mr: 4,
          borderRight: 1,
          borderColor: 'divider',
          minHeight: '100vh',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Settings
        </Typography>
        <List>
          {["Profile Information", "Account", "Email Notifications", "Memberships"].map((section) => (
            <ListItem disablePadding key={section}>
              <ListItemButton onClick={() => setActiveSection(section)}>
                <ListItemText primary={section} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Render Section Content */}
      {renderSectionContent()}
    </Container>
  );
};

export default SettingsComponents;

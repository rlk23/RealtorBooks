"use client";
import React, { useState } from 'react';
import {
  Container,
  TextField,
  Typography,
  Button,
  Paper,
  Box,
  Stack,
} from '@mui/material';

export default function FeedbackPage() {
  // State to store the user's input
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    message: '',
  });

  // State for feedback submission status
  const [submitted, setSubmitted] = useState(false);

  // Handler for input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the feedback to your server
    console.log('Feedback Submitted:', feedback);
    setSubmitted(true);
    setFeedback({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Feedback Form
        </Typography>
        <Typography variant="body1" gutterBottom>
          We value your feedback. Please let us know your thoughts or issues you have experienced.
        </Typography>

        {/* Feedback Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Stack spacing={3}>
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              value={feedback.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              value={feedback.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Feedback/Issue"
              name="message"
              variant="outlined"
              value={feedback.message}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={4}
            />
            <Button type="submit" variant="contained" color="primary">
              Submit Feedback
            </Button>
          </Stack>
        </Box>

        {/* Success Message */}
        {submitted && (
          <Typography variant="h6" color="success.main" sx={{ mt: 3 }}>
            Thank you for your feedback!
          </Typography>
        )}
      </Paper>
    </Container>
  );
}

// Simple Express server for BookMe global bookings
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let bookings = [];

// Get all bookings
app.get('/bookings', (req, res) => {
  res.json(bookings);
});

// Add a new booking
app.post('/bookings', (req, res) => {
  const booking = req.body;
  if (!booking || !booking.id || !booking.customer || !booking.serviceId || !booking.datetime) {
    return res.status(400).json({ error: 'Invalid booking data' });
  }
  bookings.push(booking);
  res.status(201).json(booking);
});

// Delete a booking by id
app.delete('/bookings/:id', (req, res) => {
  const id = req.params.id;
  const before = bookings.length;
  bookings = bookings.filter(b => String(b.id) !== String(id));
  if (bookings.length === before) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`BookMe server running on port ${PORT}`);
}); 
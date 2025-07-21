const fs = require('fs');
const path = require('path');
const BOOKINGS_FILE = path.join(__dirname, 'bookings-data.json');

function readBookings() {
  try {
    return JSON.parse(fs.readFileSync(BOOKINGS_FILE, 'utf8'));
  } catch {
    return [];
  }
}
function writeBookings(bookings) {
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
}

exports.handler = async function(event) {
  // Enable CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: '',
    };
  }
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };
  let bookings = readBookings();
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(bookings),
    };
  }
  if (event.httpMethod === 'POST') {
    const booking = JSON.parse(event.body);
    if (!booking || !booking.id || !booking.customer || !booking.serviceId || !booking.datetime) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid booking data' }) };
    }
    bookings.push(booking);
    writeBookings(bookings);
    return {
      statusCode: 201,
      headers,
      body: JSON.stringify(booking),
    };
  }
  if (event.httpMethod === 'DELETE') {
    const id = event.path.split('/').pop();
    const before = bookings.length;
    bookings = bookings.filter(b => String(b.id) !== String(id));
    writeBookings(bookings);
    if (bookings.length === before) {
      return { statusCode: 404, headers, body: JSON.stringify({ error: 'Booking not found' }) };
    }
    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
  }
  return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
}; 
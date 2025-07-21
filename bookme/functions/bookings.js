const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://iwrzuvetjfrhsgprrrom.supabase.co'; // <-- your Supabase Project URL
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3cnp1dmV0amZyaHNncHJycm9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwODIwNzAsImV4cCI6MjA2ODY1ODA3MH0.fjl3rqy71p89pdBXlhCMBZdLoAZ4cB6j1uQ7aIx1xGI'; // <-- paste your anon public key here
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

exports.handler = async function(event) {
  console.log('HTTP Method:', event.httpMethod);
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

  try {
    if (event.httpMethod === 'GET') {
      const { data, error } = await supabase.from('bookings').select('*');
      if (error) return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data),
      };
    }

    if (event.httpMethod === 'POST') {
      const booking = JSON.parse(event.body);
      if (!booking || !booking.id || !booking.customer || !booking.serviceId || !booking.datetime) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid booking data' }) };
      }
      const { data, error } = await supabase.from('bookings').insert([booking]);
      if (error) return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(data[0]),
      };
    }

    if (event.httpMethod === 'DELETE') {
      const id = event.path.split('/').pop();
      const { error } = await supabase.from('bookings').delete().eq('id', id);
      if (error) return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
      return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  } catch (err) {
    console.error('Function error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  }
}; 
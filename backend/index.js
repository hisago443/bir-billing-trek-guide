const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const supabase = require('./supabase');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Bir Billing API is running!' });
});

// Cafes list
app.get('/api/cafes', async (req, res) => {
  const { data, error } = await supabase.from('cafes').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});
// Cafe detail
app.get('/api/cafes/:id', async (req, res) => {
  const { data, error } = await supabase.from('cafes').select('*').eq('id', req.params.id).single();
  if (error || !data) return res.status(404).json({ error: 'Cafe not found' });
  res.json(data);
});

// Treks list
app.get('/api/treks', async (req, res) => {
  const { data, error } = await supabase.from('treks').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});
// Trek detail
app.get('/api/treks/:id', async (req, res) => {
  const { data, error } = await supabase.from('treks').select('*').eq('id', req.params.id).single();
  if (error || !data) return res.status(404).json({ error: 'Trek not found' });
  res.json(data);
});

// Accommodations list
app.get('/api/accommodations', async (req, res) => {
  const { data, error } = await supabase.from('accommodations').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});
// Accommodation detail
app.get('/api/accommodations/:id', async (req, res) => {
  const { data, error } = await supabase.from('accommodations').select('*').eq('id', req.params.id).single();
  if (error || !data) return res.status(404).json({ error: 'Accommodation not found' });
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
}); 
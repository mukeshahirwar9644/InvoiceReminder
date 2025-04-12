console.log("🔥 app.js file loaded");
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();
require('./config/passport');
const db = require('./config/db');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', require('./routes/auth'));

app.get('/api/invoices', (req, res) => {
  db.query('SELECT * FROM invoices', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// zapier
const zapierWebhookUrl = 'https://hooks.zapier.com/hooks/catch/22483639/20gibih/'; // Replace with your Zapier Webhook URL

// POST route to trigger Zapier webhook (e.g., sending overdue invoices)
app.post('/send-overdue-reminder', async (req, res) => {
  try {
    const overdueInvoices = req.body.invoices; // The invoices data should come from your request body
    const response = await axios.post(zapierWebhookUrl, {
      recipient_email: req.body.email,
      recipient_name: req.body.name,
      overdue_invoices: overdueInvoices,
    });

    console.log('Zapier Webhook Response:', response.data);
    res.status(200).send('Reminder sent to Zapier!');
  } catch (error) {
    console.error('Error sending reminder:', error);
    res.status(500).send('Failed to send reminder');
  }
});

// Example route to simulate sending overdue reminders
app.post('/test-overdue', (req, res) => {
  const mockInvoices = [
    {
      invoice_number: 'INV-1001',
      amount: 4500,
      due_date: '2025-04-19',
      status: 'pending',
    },
    {
      invoice_number: 'INV-1002',
      amount: 3000,
      due_date: '2025-04-15',
      status: 'pending',
    },
  ];
  res.json({ email: 'amit@example.com', name: 'Amit Sharma', invoices: mockInvoices });
});




app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});
app.use('/api/invoices', require('./routes/invoice'));

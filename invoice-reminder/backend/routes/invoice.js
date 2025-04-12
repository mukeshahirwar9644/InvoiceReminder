const express = require('express');
const router = express.Router();

const dummyInvoices = [
  { id: 'INV001', amount: 1200, due: '2024-12-01', status: 'Due' },
  { id: 'INV002', amount: 800, due: '2024-12-05', status: 'Paid' },
  { id: 'INV003', amount: 500, due: '2024-12-10', status: 'Overdue' },
];

router.get('/', (req, res) => {
  res.json(dummyInvoices);
});

module.exports = router;

import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // ⬅️ Import the CSS file

function Dashboard({ user }) {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/invoices`)
      .then((res) => res.json())
      .then((data) => setInvoices(data))
      .catch((err) => console.error('Error fetching invoices:', err));
  }, [user.email]);

  const isOverdue = (invoice) => {
    const dueDate = new Date(invoice.due_date);
    const today = new Date();
    // console.log("due date is "+dueDate);
    // console.log("today date is "+today);
    return invoice.status.toLowerCase() === 'pending' && dueDate < today;
  };
  const sendReminder = () => {
    const overdue = invoices.filter(isOverdue);
    if (overdue.length === 0) {
      alert("✅ No overdue invoices.");
      return;
    }

    fetch('http://localhost:5000/send-overdue-reminder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        name: user.recipient_name,
        invoices: overdue,
      }),
    })
      .then((response) => response.json())
      .then(() => alert("📩 Reminder sent successfully!"))
      .catch((error) => console.error('❌ Error:', error));
  };

  return (
    <div className="dashboard-container">
      <div className="profile-card">
        <img src={user.picture} alt="profile" className="profile-img" />
        <div>
          <h2>👋 Welcome, {user.recipient_name}</h2>
          <p>{user.email}</p>
        </div>
      </div>

      <div className="invoice-section">
        <h3>📄 Your Invoices</h3>
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Recipient</th>
              <th>Email</th>
              <th>Amount (₹)</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => {
              const overdue = isOverdue(invoice);
              return (
                <tr key={invoice.id} className={overdue ? 'overdue' : ''}>
                  <td>{invoice.invoice_number}</td>
                  <td>{invoice.recipient_name}</td>
                  <td>{invoice.recipient_email}</td>
                  <td>{invoice.amount}</td>
                  <td>{new Date(invoice.due_date).toLocaleDateString()}</td>
                  <td>{invoice.status}</td>
                  <td>{new Date(invoice.created_at).toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button className="reminder-btn" onClick={sendReminder}>
          🚀 Send Reminder
        </button>
      </div>
    </div>
  );
}

export default Dashboard;

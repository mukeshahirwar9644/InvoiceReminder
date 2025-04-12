📄 Project Documentation: Invoice Reminder and Follow-up Automation
🧩 Project Overview
This project implements a full-stack invoice management system with the ability to:
•	Login users securely via Google OAuth.
•	Display a list of due and overdue invoices.
•	Allow users to send follow-up reminders for overdue invoices via a Zapier webhook.
It consists of two major parts:
•	A frontend built with ReactJS.
•	A backend built with Node.js + Express +  MySQL.
________________________________________
🧠 Key Features
✅ Google OAuth Login
•	Users authenticate securely via their Google accounts.
✅ Invoice Dashboard
•	Users can see a list of invoices fetched from backend API.
•	Invoices display recipient name, amount, due date, and status.
✅ Zapier Webhook Integration
•	A "Send Reminder" button triggers a Zapier webhook for overdue invoices.
•	Zapier can be configured to send email, update sheets, etc.
________________________________________
⚙️ Backend Overview
Tech Stack: Node.js, Express.js, MySQL, Passport.js
📁 Directory Structure (Sample)
backend/
├── app.js
├── .env
├── config/
│   └── passport.js
├── routes/
│   ├── auth.js
│   └── invoice.js
└── models/
    └── Invoice.js (optional if using MongoDB)
📦 Dependencies (From package.json)
"dependencies": {
  "axios": "^1.8.4",
  "cors": "^2.8.5",
  "dotenv": "^16.5.0",
  "express": "^5.1.0",
  "express-session": "^1.18.1",
  "mysql": "^2.18.1",
  "mysql2": "^3.14.0",
  "passport": "^0.7.0",
  "passport-google-oauth20": "^2.0.0",
  "react-router-dom": "^7.5.0"
}
🌐 API Endpoints
•	GET /api/invoices → Returns a list of invoices (mock/static for now)
•	GET /auth/google → Google OAuth login route
•	GET /auth/google/callback → Callback from Google
🛡️ Auth Flow
•	Session stored via express-session
•	Google Strategy configured via Passport.js
🗃️ Database
•	MySQL connection details hard coded.
•	Invoice data stored in MySQL database and fetched using mysql2 library.
________________________________________
🎨 Frontend Overview
Tech Stack: ReactJS, @react-oauth/google
📁 Directory Structure (Sample)
frontend/
├── public/
├── src/
│   ├── App.js
│   ├── Dashboard.js
│   ├── index.css
│   └── index.js
├── tailwind.config.js
└── package.json
📦 Dependencies (From package.json)
"dependencies": {
  "@react-oauth/google": "^0.12.1",
  "axios": "^1.8.4",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-router-dom": "^7.5.0",
  "react-scripts": "5.0.1"
},
"devDependencies": {
  "tailwindcss": "^4.1.3",
  "postcss": "^8.5.3",
  "autoprefixer": "^10.4.21"
}
🧠 Main Components
•	App.js: Handles login with Google and routes to Dashboard
•	Dashboard.js:
o	Fetches invoice list from backend
o	Displays invoice info in list format
o	Contains "Send Reminder" button to trigger Zapier webhook
________________________________________
🔗 Zapier Integration
•	Zapier configured with a Webhook (Catch Hook) trigger
•	React frontend sends POST request to the Zapier Webhook URL
•	Data includes:
o	email
o	overdueInvoices (Array of invoices with status = 'Overdue')
________________________________________
🔐 Environment Variables
📁 .env (Backend)
PORT=5000
MONGO_URI=mongodb://localhost:27017/invoiced
MySQL credentials : 
host: 'mysql-mukesh.alwaysdata.net',
user: 'mukesh',
password: 'mukesh@123',
database: 'mukesh_invoice'

________________________________________
🚀 Running the Project
📦 Start Backend
cd backend
node app.js
💻 Start Frontend
cd frontend
npm install
npm start
________________________________________
✅ Future Improvements
•	Add authentication middleware for invoice API
•	Improve UI with charts or tables
•	Add multi-user support (invoices per user)
•	Add logout functionality
________________________________________
🙌 Done By:
Mukesh Ahirwar
B.Tech CSE (AI & ML) – IIIT Nagpur
LinkedIn: https://linkedin.com/in/MukeshAhirwar9644
GitHub: https://github.com/mukeshahirwar9644
________________________________________


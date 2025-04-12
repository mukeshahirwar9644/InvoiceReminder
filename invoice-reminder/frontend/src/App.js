import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import Dashboard from './dashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="app-container">
      {!user ? (
        <div className="login-card">
          <h1 className="login-title">Welcome to InvoiceMate</h1>
          <p className="login-description">
            Manage your invoices, track overdue payments, and stay on top of your finances.
          </p>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decoded = jwtDecode(credentialResponse.credential);
              console.log("✅ Login Success:", decoded);
              setUser(decoded);
            }}
            onError={() => {
              console.log('❌ Login Failed');
            }}
          />
          <p className="login-footer">Secure login powered by Google</p>
        </div>
      ) : (
        <Dashboard user={user} />
      )}
    </div>
  );
}

export default App;

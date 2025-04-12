import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="227520277542-r860stfle6mg0d4age0qhq67gmat66rp.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
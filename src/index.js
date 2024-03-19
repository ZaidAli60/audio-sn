import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./config/global"
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter } from 'react-router-dom';
import SidebarContextProvider from './context/SideBarContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthContextProvider from 'context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="274409146209-qp9qp2au3k9bgghu8tb7urf2j7qal8e3.apps.googleusercontent.com">
        <AuthContextProvider>
          <SidebarContextProvider>
            <App />
          </SidebarContextProvider>
        </AuthContextProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

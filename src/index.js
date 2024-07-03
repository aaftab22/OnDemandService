import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './Styles.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

// import BrowserRouter from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <App />
  </React.StrictMode>

);

reportWebVitals();

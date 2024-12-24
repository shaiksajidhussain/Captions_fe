import React from 'react';
import ReactDOM from 'react-dom/client';
import { TranscriptionProvider } from './context/TranscriptionContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TranscriptionProvider>
      <App />
    </TranscriptionProvider>
  </React.StrictMode>
);

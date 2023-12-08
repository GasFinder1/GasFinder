import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LocationContextProvider } from './context/LocationContext';
import { DistanceContextProvider } from './context/DistanceContext';
import { ControlContextProvider } from './context/ControlContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ControlContextProvider>
      <LocationContextProvider>
        <DistanceContextProvider>
          <App />
        </DistanceContextProvider>
      </LocationContextProvider>
    </ControlContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//element react
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Master from './Master.jsx';

// CSS
import './css/global.css';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Master />
      </Router>
    </LanguageProvider>
  );
}

export default App;

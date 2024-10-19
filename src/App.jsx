// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Form from './Pages/Form/form'
import CardView from './Pages/Cardview/CardView';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/form" className="nav-link">Dashboard</Link>
          <Link to="/cardview" className="nav-link">Card View</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/cardview" element={<CardView />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="home-container">
      <h2>Welcome to the Medical Management App</h2>
      <p>Use the navigation above to explore different functionalities.</p>
    </div>
  );
}

export default App;

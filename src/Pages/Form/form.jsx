// src/Pages/Form.jsx
import React, { useState } from 'react';
import './form.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import icons

function Form() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownClick = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const getDropdownIcon = (name) => {
    return openDropdown === name ? <FaChevronUp /> : <FaChevronDown />; // Show different icons based on state
  };

  return (
    <div className="form-container">
      <h2>Medical Management Dashboard</h2>

      {/* Add Patient Dropdown */}
      <div className="dropdown">
        <button onClick={() => handleDropdownClick('addPatient')} className="dropdown-btn">
          Add Patient <span className="dropdown-icon">{getDropdownIcon('addPatient')}</span>
        </button>
        {openDropdown === 'addPatient' && (
          <div className="card">
            <h3>Add Patient</h3>
          </div>
        )}
      </div>

      {/* Add Symptoms Dropdown */}
      <div className="dropdown">
        <button onClick={() => handleDropdownClick('addSymptoms')} className="dropdown-btn">
          Add Symptoms <span className="dropdown-icon">{getDropdownIcon('addSymptoms')}</span>
        </button>
        {openDropdown === 'addSymptoms' && (
          <div className="card">
            <h3>Add Symptoms</h3>
          </div>
        )}
      </div>

      {/* Conduct Test Dropdown */}
      <div className="dropdown">
        <button onClick={() => handleDropdownClick('conductTest')} className="dropdown-btn">
          Conduct Test <span className="dropdown-icon">{getDropdownIcon('conductTest')}</span>
        </button>
        {openDropdown === 'conductTest' && (
          <div className="card">
            <h3>Conduct Test</h3>
          </div>
        )}
      </div>

      {/* Doctor Comment Dropdown */}
      <div className="dropdown">
        <button onClick={() => handleDropdownClick('doctorComment')} className="dropdown-btn">
          Doctor Comment <span className="dropdown-icon">{getDropdownIcon('doctorComment')}</span>
        </button>
        {openDropdown === 'doctorComment' && (
          <div className="card">
            <h3>Doctor Comment</h3>
          </div>
        )}
      </div>

      {/* View Report Dropdown */}
      <div className="dropdown">
        <button onClick={() => handleDropdownClick('viewReport')} className="dropdown-btn">
          View Report <span className="dropdown-icon">{getDropdownIcon('viewReport')}</span>
        </button>
        {openDropdown === 'viewReport' && (
          <div className="card">
            <h3>View Report</h3>
          </div>
        )}
      </div>

      {/* Device Setup Dropdown */}
      <div className="dropdown">
        <button onClick={() => handleDropdownClick('deviceSetup')} className="dropdown-btn">
          Device Setup <span className="dropdown-icon">{getDropdownIcon('deviceSetup')}</span>
        </button>
        {openDropdown === 'deviceSetup' && (
          <div className="card">
            <h3>Device Setup</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Form;

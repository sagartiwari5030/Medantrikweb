// src/Pages/CardView.jsx
import React from 'react';
import './cardview.css';

function CardView() {
  const cards = [
    {
      name: 'addSymptoms',
      title: 'Add Symptoms',
      content: 'Enter your symptoms for further analysis and consultation.',
      link: 'https://medantrik.in/camp2/add_symptoms.html',
    },
    {
      name: 'doctorpannel',
      title: 'Doctor Panel',
      content: 'Doctors can view and manage patient symptoms, provide diagnoses and recommendations.',
      link: 'https://medantrik.in/camp2/doctor_panel.html',
    },
    {
      name: 'reportgeneration',
      title: 'Report Generation',
      content: 'Generate a comprehensive report based on your symptoms and diagnoses.',
      link: 'https://medantrik.in/camp2/generate_report.html',
    },
    {
      name: 'conductTest',
      title: 'Conduct Test',
      content: 'Initiate various medical tests and log the results directly in the patient’s profile.',
    },
    {
      name: 'addPatient',
      title: 'Add Patient',
      content: 'Easily add new patients to the system for tracking their medical history and appointments.',
    },
    {
      name: 'deviceSetup',
      title: 'Device Setup',
      content: 'Configure and calibrate medical devices for accurate data collection and diagnostics.',
    },
  ];

  return (
    <div className="cardview-container">
      <h2 className="cardview-title">Medical Management Dashboard - Card View</h2>
      <div className="card-grid">
        {cards.map((card) => (
          card.link ? (
            <a
              key={card.name}
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card-link"
            >
              <div className="card">
                <h3 className="card-title">{card.title}</h3>
                <div className="card-content">
                  <div className="card-small-content">
                    {card.content}
                  </div>
                </div>
              </div>
            </a>
          ) : (
            <div key={card.name} className="card">
              <h3 className="card-title">{card.title}</h3>
              <div className="card-content">
                <div className="card-small-content">
                  {card.content}
                </div>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default CardView;

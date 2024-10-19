// src/Pages/CardView.jsx
import React, { useState } from 'react';
import './cardview.css';

function CardView() {
  const [openCard, setOpenCard] = useState(null);

  const handleCardClick = (name) => {
    setOpenCard(openCard === name ? null : name);
  };

  const cards = [
    { name: 'addPatient', title: 'Add Patient' },
    { name: 'addSymptoms', title: 'Add Symptoms' },
    { name: 'conductTest', title: 'Conduct Test' },
    { name: 'doctorComment', title: 'Doctor Comment' },
    { name: 'viewReport', title: 'View Report' },
    { name: 'deviceSetup', title: 'Device Setup' },
  ];

  return (
    <div className="cardview-container">
      <h2 className="cardview-title">Medical Management Dashboard - Card View</h2>
      <div className="card-grid">
        {cards.map((card) => (
          <div key={card.name} className="card" onClick={() => handleCardClick(card.name)}>
            <h3 className="card-title">{card.title}</h3>
            {openCard === card.name && (
              <div className="card-content">
                <p>Details about {card.title}...</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardView;

import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Bienvenue sur l'application Excel WebApp</h1>
      <p>Sélectionnez une collection :</p>
      <ul>
        <li>
          <Link to="/excel">📄 Données Excel classiques</Link>
        </li>
        <li>
          <Link to="/statistics">📊 Données Statistiques mensuelles</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;

import React from 'react';
import NbAccompagnementsChart from '../components/NbAccompagnementsChart';
import { Link } from 'react-router-dom';

const NbAccompagnementPage = () => {
  return (
    <div className="container mt-4">
      <Link to="/collection2" className="btn btn-outline-primary mb-3">← Retour</Link>
      <h3>📈 Graphique des accompagnements</h3>
      <NbAccompagnementsChart />
    </div>
  );
};

export default NbAccompagnementPage;


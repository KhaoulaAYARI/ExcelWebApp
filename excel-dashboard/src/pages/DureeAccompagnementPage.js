import React from 'react';
import { Link } from 'react-router-dom';
import DureeAccompagnementChart from '../components/DureeAccompagnementChart';

const DureeAccompagnementPage = () => {
  return (
    <div className="container mt-4">
      <Link to="/collection2" className="btn btn-outline-primary mb-3">← Retour</Link>
      <DureeAccompagnementChart />
    </div>
  );
};

export default DureeAccompagnementPage;

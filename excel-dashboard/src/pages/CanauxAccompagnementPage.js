import React from 'react';
import CanauxAccompagnementChart from '../components/CanauxAccompagnementChart';
import { Link } from 'react-router-dom';

const CanauxAccompagnementPage = () => {
  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-outline-primary mb-3">← Retour</Link>
      <CanauxAccompagnementChart />
    </div>
  );
};

export default CanauxAccompagnementPage;

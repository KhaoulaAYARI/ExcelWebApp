import React from 'react';
import StatutUsagersChart from '../components/StatutUsagersChart';
import { Link } from 'react-router-dom';

const StatutUsagersPage = () => {
  return (
    <div className="container mt-4">
      <Link to="/collection2" className="btn btn-outline-primary mb-3">← Retour</Link>
      <StatutUsagersChart />
    </div>
  );
};

export default StatutUsagersPage;

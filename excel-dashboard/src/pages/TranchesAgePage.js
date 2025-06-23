import React from 'react';
import TranchesAgeChart from '../components/TranchesAgeChart';
import { Link } from 'react-router-dom';

const TranchesAgePage = () => {
  return (
    <div className="container mt-4">
      <Link to="/collection2" className="btn btn-outline-primary mb-3">← Retour</Link>
      <TranchesAgeChart />
    </div>
  );
};

export default TranchesAgePage;

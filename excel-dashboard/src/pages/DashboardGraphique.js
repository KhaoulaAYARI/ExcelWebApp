import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DureeAccompagnementChart from '../components/DureeAccompagnementChart';
// import TranchesAgeChart from '../components/TranchesAgeChart';
import StatutUsagersChart from '../components/StatutUsagersChart';
import CanauxAccompagnementChart from '../components/CanauxAccompagnementChart';
import NbAccompagnementsChart from '../components/NbAccompagnementsChart';
import TranchesAgeGlobalChart from '../components/TranchesAgeGlobalChart';


const DashboardGraphique = () => {
  const [activeTab, setActiveTab] = useState('accompagnements');

  const renderTab = () => {
    switch (activeTab) {
      case 'accompagnements':
        return <NbAccompagnementsChart />;
      case 'durees':
        return <DureeAccompagnementChart />;
      case 'tranches':
        return <TranchesAgeGlobalChart />;
      case 'statuts':
        return <StatutUsagersChart />;
      case 'canaux':
        return <CanauxAccompagnementChart />;
      default:
        return null;
    }
  };

  return (
    <div className="container mt-4">
      <Link to="/collection2" className="btn btn-outline-primary mb-3">← Retour</Link>
      <h2 className="mb-4">📊 Tableau de bord des statistiques</h2>

      <div className="btn-group mb-4">
        <button className={`btn btn-outline-secondary ${activeTab === 'accompagnements' && 'active'}`} onClick={() => setActiveTab('accompagnements')}>Accompagnements</button>
        <button className={`btn btn-outline-secondary ${activeTab === 'durees' && 'active'}`} onClick={() => setActiveTab('durees')}>Durée</button>
        <button className={`btn btn-outline-secondary ${activeTab === 'tranches' && 'active'}`} onClick={() => setActiveTab('tranches')}>Âges</button>
        <button className={`btn btn-outline-secondary ${activeTab === 'statuts' && 'active'}`} onClick={() => setActiveTab('statuts')}>Statuts</button>
        <button className={`btn btn-outline-secondary ${activeTab === 'canaux' && 'active'}`} onClick={() => setActiveTab('canaux')}>Canaux</button>
      </div>

      {renderTab()}
    </div>
  );
};

export default DashboardGraphique;

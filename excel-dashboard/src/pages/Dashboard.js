import React, { useState } from 'react';
import DataForm from '../components/DataForm';
import DataTable from '../components/DataTable';

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div>
      <h1>📊 Tableau des Données Excel</h1>
      <DataForm onAdded={handleRefresh} />
      <DataTable refresh={refresh} />
    </div>
  );
};

export default Dashboard;

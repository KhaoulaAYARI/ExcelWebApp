import React, { useState } from 'react';
import DataForm from './components/DataForm';
import DataTable from './components/DataTable';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Tableau de données Excel</h1>
      <DataForm onAdded={handleAdded} />
      <DataTable refresh={refresh} />
    </div>
  );
}

export default App;

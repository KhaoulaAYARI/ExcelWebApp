import React, { useState } from 'react';
import StatisticsExcelUpload from '../components/StatisticsExcelUpload';
import StatisticsDataForm from '../components/StatisticsDataForm';
import StatisticsDataTable from '../components/StatisticsDataTable';

function StatisticsCollectionPage() {
  const [refresh, setRefresh] = useState(false);
  const [uploadedData, setUploadedData] = useState(null);

  const handleAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Données Statistiques Mensuelles (Collection 2)</h2>

      <div style={{ marginBottom: '30px' }}>
        <h3>📤 Importer un fichier Excel</h3>
        <StatisticsExcelUpload onUploadSuccess={(data) => {
          setUploadedData(data);
          handleAdded();
        }} />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>✍️ Ajouter une donnée manuellement</h3>
        <StatisticsDataForm onAdded={handleAdded} />
      </div>

      <div>
        <h3>📋 Liste des données</h3>
        <StatisticsDataTable refresh={refresh} uploadedData={uploadedData} />
      </div>
    </div>
  );
}

export default StatisticsCollectionPage;

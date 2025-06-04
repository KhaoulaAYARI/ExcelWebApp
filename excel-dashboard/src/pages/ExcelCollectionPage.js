import React, { useState } from 'react';
import ExcelUpload from '../components/ExcelUpload';
import DataForm from '../components/DataForm';
import DataTable from '../components/DataTable';

function ExcelCollectionPage() {
  const [refresh, setRefresh] = useState(false);
  const [uploadedData, setUploadedData] = useState(null);

  const handleAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Données Excel (Collection 1)</h2>

      <div style={{ marginBottom: '30px' }}>
        <h3>📤 Importer un fichier Excel</h3>
        <ExcelUpload onUploadSuccess={(data) => {
          setUploadedData(data);
          handleAdded();
        }} />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>✍️ Ajouter une donnée manuellement</h3>
        <DataForm onAdded={handleAdded} />
      </div>

      <div>
        <h3>📋 Liste des données</h3>
        <DataTable refresh={refresh} uploadedData={uploadedData} />
      </div>
    </div>
  );
}

export default ExcelCollectionPage;

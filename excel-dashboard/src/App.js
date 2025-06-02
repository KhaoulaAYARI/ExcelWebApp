import React, { useState } from 'react';
import DataForm from './components/DataForm';
import DataTable from './components/DataTable';
import ExcelUpload from './components/ExcelUpload'; // Importez le nouveau composant

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleAdded = () => {
    setRefresh(!refresh); // Cette fonction rafraîchit DataTable
  };

  // Ajoutez un état pour gérer le fichier uploadé si nécessaire
  const [uploadedData, setUploadedData] = useState(null);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Tableau de données Excel</h1>
      
      {/* Section Upload - Ajoutez le composant ici */}
      <div style={{ marginBottom: '30px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
        <h2>Importer un fichier Excel</h2>
        <ExcelUpload 
          onUploadSuccess={(data) => {
            setUploadedData(data); // Si vous voulez traiter les données
            handleAdded(); // Rafraîchit le tableau après upload
          }} 
        />
      </div>

      {/* Section existante */}
      <DataForm onAdded={handleAdded} />
      <DataTable refresh={refresh} uploadedData={uploadedData} />
    </div>
  );
}

export default App;

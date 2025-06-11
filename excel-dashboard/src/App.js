import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditStatisticsDataForm from './components/EditStatisticsDataForm'; 


// Composant de navigation
import Navbar from './components/Navbar';

// Première collection
import DataForm from './components/DataForm';
import DataTable from './components/DataTable';
import ExcelUpload from './components/ExcelUpload';

// Deuxième collection (statistiques)
import StatisticsDataForm from './components/StatisticsDataForm';
import StatisticsDataTable from './components/StatisticsDataTable';
import StatisticsExcelUpload from './components/StatisticsExcelUpload';

function HomePage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>🏠 Accueil</h1>
      <p>Choisissez une collection :</p>
      <ul>
        <li><a href="/collection1">Première collection</a></li>
        <li><a href="/collection2">Deuxième collection (Statistiques)</a></li>
      </ul>
    </div>
  );
}

function FirstCollectionPage() {
  const [refresh, setRefresh] = useState(false);
  const [uploadedData, setUploadedData] = useState(null);

  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div style={{ padding: '20px' }}>
      <h2>📊 Première Collection</h2>
      <section style={{ marginBottom: '30px' }}>
        <h3>Importer un fichier Excel</h3>
        <ExcelUpload onUploadSuccess={(data) => {
          setUploadedData(data);
          handleRefresh();
        }} />
      </section>
      <section style={{ marginBottom: '30px' }}>
        <h3>Ajouter un enregistrement</h3>
        <DataForm onAdded={handleRefresh} />
      </section>
      <section>
        <h3>Tableau de données</h3>
        <DataTable refresh={refresh} uploadedData={uploadedData} />
      </section>
    </div>
  );
}

function SecondCollectionPage() {
  const [refresh, setRefresh] = useState(false);
  const [uploadedData, setUploadedData] = useState(null);

  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div style={{ padding: '20px' }}>
      <h2>📈 Deuxième Collection (Statistiques)</h2>
      <section style={{ marginBottom: '30px' }}>
        <h3>Importer un fichier Excel</h3>
        <StatisticsExcelUpload onUploadSuccess={(data) => {
          setUploadedData(data);
          handleRefresh();
        }} />
      </section>
      <section style={{ marginBottom: '30px' }}>
        <h3>Ajouter un enregistrement</h3>
        <StatisticsDataForm onAdded={handleRefresh} />
      </section>
      <section>
        <h3>Tableau de données</h3>
        <StatisticsDataTable refresh={refresh} uploadedData={uploadedData} />
      </section>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar /> {/* La barre de navigation visible sur toutes les pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collection1" element={<FirstCollectionPage />} />
        <Route path="/collection2" element={<SecondCollectionPage />} />
        <Route path="/modifier-collection2/:id" element={<EditStatisticsDataForm />} />

      </Routes>
    </Router>
  );
}

export default App;


import React, { useState } from 'react';
import axios from 'axios';

const ExcelUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Ajout d'un état de chargement

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadStatus(''); // Reset du statut quand un nouveau fichier est sélectionné
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadStatus('Veuillez sélectionner un fichier');
      return;
    }

    const formData = new FormData();
    formData.append('excelFile', file);
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      setUploadStatus('Fichier uploadé avec succès !');
      if (onUploadSuccess) {
        onUploadSuccess(response.data); // Envoi des données au composant parent
      }
    } catch (error) {
      setUploadStatus(`Erreur lors de l'upload: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      padding: '20px',
      border: '1px dashed #ccc',
      borderRadius: '5px',
      marginBottom: '20px'
    }}>
      <h2 style={{ marginTop: 0 }}>Importer un fichier Excel</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input 
          type="file" 
          accept=".xlsx, .xls, .csv" 
          onChange={handleFileChange}
          style={{ padding: '8px' }}
        />
        <button 
          type="submit" 
          disabled={isLoading}
          style={{
            padding: '8px 16px',
            backgroundColor: isLoading ? '#ccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Envoi en cours...' : 'Importer'}
        </button>
      </form>
      {uploadStatus && (
        <p style={{ color: uploadStatus.includes('succès') ? 'green' : 'red', marginTop: '10px' }}>
          {uploadStatus}
        </p>
      )}
    </div>
  );
};

export default ExcelUpload;
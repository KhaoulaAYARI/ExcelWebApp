import React, { useState } from 'react';

function StatisticsExcelUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Veuillez choisir un fichier Excel");

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/api/excel/uploadStatistics', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        alert('Fichier importé avec succès');
        onUploadSuccess(result.data); // Appelle le parent pour rafraîchir
      } else {
        alert('Erreur: ' + result.message);
      }
    } catch (error) {
      console.error(error);
      alert('Erreur lors de l\'upload');
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Importer</button>
    </div>
  );
}

export default StatisticsExcelUpload;

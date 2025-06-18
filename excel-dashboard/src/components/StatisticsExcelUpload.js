import React, { useState } from 'react';

const StatisticsExcelUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadStatus('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadStatus('Veuillez sélectionner un fichier');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/excel/uploadStatistics', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setUploadStatus('Fichier importé avec succès !');
        onUploadSuccess(result.data);
      } else {
        setUploadStatus('Erreur: ' + result.message);
      }
    } catch (error) {
      console.error(error);
      setUploadStatus("Erreur lors de l'upload");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h4 className="card-title mb-3">Importer un fichier de statistiques</h4>
        <form onSubmit={handleSubmit} className="d-flex flex-column flex-md-row gap-2 align-items-start">
          <input
            type="file"
            accept=".xlsx, .xls, .csv"
            onChange={handleFileChange}
            className="form-control"
          />
          <button
            type="submit"
            className={`btn btn-${isLoading ? 'secondary' : 'success'}`}
            disabled={isLoading}
          >
            {isLoading ? 'Envoi en cours...' : 'Importer'}
          </button>
        </form>
        {uploadStatus && (
          <div className={`alert mt-3 ${uploadStatus.includes('succès') ? 'alert-success' : 'alert-danger'}`}>
            {uploadStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatisticsExcelUpload;




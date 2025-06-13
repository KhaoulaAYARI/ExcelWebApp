import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

const ExcelExport = () => {
  // 1. État pour stocker les données 
  const [data, setData] = useState([]);

  // 2. Simuler la récupération des données
  useEffect(() => {
    // Récupération depuis une API
    fetch("http://localhost:5000/api/statistics")
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch(console.error);

  
  }, []);

  // 3. Export Excel
  const handleExport = () => {
    if (data.length === 0) {
      alert("Aucune donnée à exporter !");
      return;
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Export");
    XLSX.writeFile(workbook, "export_complet.xlsx");
  };

  return (
    <div>
      <button onClick={handleExport} disabled={!data.length}>
        Exporter {data.length} lignes
      </button>
    </div>
  );
};
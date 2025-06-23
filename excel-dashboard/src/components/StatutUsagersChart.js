import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const StatutUsagersChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/nbAccompagnement')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  const chartData = {
    labels: data.map(d => `${String(d._id.month).padStart(2, '0')}/${d._id.year}`),
    datasets: [
      {
        label: 'Scolarisé',
        data: data.map(d => d.totalScolarise || 0),
        backgroundColor: 'rgba(54, 162, 235, 0.6)'
      },
      {
        label: 'Sans emploi',
        data: data.map(d => d.totalSansEmploi || 0),
        backgroundColor: 'rgba(255, 99, 132, 0.6)'
      },
      {
        label: 'En emploi',
        data: data.map(d => d.totalEnEmploi || 0),
        backgroundColor: 'rgba(255, 206, 86, 0.6)'
      },
      {
        label: 'Retraité',
        data: data.map(d => d.totalRetraite || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      },
      {
        label: 'Non renseigné',
        data: data.map(d => d.totalNonRenseigne || 0),
        backgroundColor: 'rgba(153, 102, 255, 0.6)'
      }
    ]
  };

  return (
    <div>
      <h3>🏷️ Statut des usagers par mois</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default StatutUsagersChart;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const CanauxAccompagnementChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/nbAccompagnement') // même route que pour les stats
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  const chartData = {
    labels: data.map(d => `${String(d._id.month).padStart(2, '0')}/${d._id.year}`),
    datasets: [
      {
        label: 'À domicile',
        data: data.map(d => d.totalADomicile || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      },
      {
        label: 'À distance',
        data: data.map(d => d.totalADistance || 0),
        backgroundColor: 'rgba(255, 206, 86, 0.6)'
      },
      {
        label: 'Lieu d’activité',
        data: data.map(d => d.totalLieuActivite || 0),
        backgroundColor: 'rgba(153, 102, 255, 0.6)'
      },
      {
        label: 'Autres',
        data: data.map(d => d.totalAutres || 0),
        backgroundColor: 'rgba(255, 99, 132, 0.6)'
      },
    ]
  };

  return (
    <div>
      <h3>📊 Répartition des canaux d’accompagnement par mois</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default CanauxAccompagnementChart;

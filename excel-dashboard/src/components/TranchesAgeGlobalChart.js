import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const TranchesAgeGlobalChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/trancheAge')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return <p>Chargement...</p>;

  const chartData = {
    labels: [
      'Moins de 12 ans',
      '12 à 18 ans',
      '18 à 35 ans',
      '35 à 60 ans',
      'Plus de 60 ans'
    ],
    datasets: [
      {
        data: [
          data.totalMoins12ans,
          data.totalEntre12_18ans,
          data.totalEntre18_35ans,
          data.totalEntre35_60ans,
          data.totalPlus60ans
        ],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ]
      }
    ]
  };

return (
  <div>
    <h3>📊 Répartition globale des tranches d'âge</h3>
    <div style={{ width: '500px', height: '400px', margin: '0 auto' }}>
      <Pie
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  </div>
);
};

export default TranchesAgeGlobalChart;

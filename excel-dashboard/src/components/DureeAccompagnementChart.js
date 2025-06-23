import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const DureeAccompagnementChart = () => {
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
        label: '-30 min',
        data: data.map(d => d.totalMoins30min || 0),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: '30–60 min',
        data: data.map(d => d.totalEntre30_60min || 0),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: '60–120 min',
        data: data.map(d => d.totalEntre60_120min || 0),
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
      {
        label: '+120 min',
        data: data.map(d => d.totalPlus120min || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ]
  };

  return (
    <div>
      <h3>🕒 Durée des accompagnements par mois</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default DureeAccompagnementChart;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; 

const NbAccompagnementsChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/nbAccompagnement')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  const chartData = {
    labels: data.map(d => `${d._id.month}/${d._id.year}`),
    datasets: [
      {
        label: 'Accompagnements',
        data: data.map(d => d.totalAccompagnements),
        backgroundColor: 'rgba(54, 162, 235, 0.6)'
      }
    ]
  };

  return (
    <div>
      <h3>Nombre d’accompagnements par mois</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default NbAccompagnementsChart;

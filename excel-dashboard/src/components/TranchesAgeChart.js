import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const TranchesAgeChart = () => {
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
        label: '-12 ans',
        data: data.map(d => d.totalMoins12ans || 0),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: '12–18 ans',
        data: data.map(d => d.totalEntre12_18ans || 0),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
      {
        label: '18–35 ans',
        data: data.map(d => d.totalEntre18_35ans || 0),
        backgroundColor: 'rgba(255, 205, 86, 0.6)',
      },
      {
        label: '35–60 ans',
        data: data.map(d => d.totalEntre35_60ans || 0),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: '+60 ans',
        data: data.map(d => d.totalPlus60ans || 0),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ]
  };

  return (
    <div>
      <h3>👥 Répartition des usagers par tranche d’âge</h3>
      <Pie  data={chartData} />
    </div>
  );
};

export default TranchesAgeChart;

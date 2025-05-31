import axios from 'axios';
import React from 'react';
import Dashboard from '../pages/Dashboard';

const API_URL = 'http://localhost:5000/api/excel';
function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <Dashboard />
    </div>
  );
}
export const fetchData = () => axios.get(API_URL);
export const createData = (data) => axios.post(API_URL, data);
export const deleteData = (id) => axios.delete(`${API_URL}/${id}`);
export default App;
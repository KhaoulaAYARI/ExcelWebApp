const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const uploadRoute = require('./routes/uploadRoute');
const excelRoutes = require('./routes/excelDataRoutes');

const app = express();

app.use(cors());              
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/excelWebApp')
.then(() => console.log('MongoDB connecté'))
.catch(err => console.log(err));

app.use('/upload', uploadRoute);
app.use('/api/excel', excelRoutes);
console.log("✅ Route '/api/excel' activée");


app.listen(5000, () => {
  console.log('Serveur en ligne sur le port 5000');
});


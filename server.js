const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const uploadRoute = require('./routes/uploadRoute');// Collection 1 upload
const excelRoutes = require('./routes/excelDataRoutes'); // Collection 1 CRUD
const statisticsRoutes = require('./routes/statisticsRoutes'); // Collection 2 (statistiques) UPLOAD
const statisticsExcelRoutes=require('./routes/statisticsExcelRoutes');
const nbAccompagnementsRoutes=require('./routes/nbAccompagnementsRoutes');


const app = express();

//app.use(cors());
app.use(cors({
    origin:'*', //a modifier plustard dans la production
 // origin: /^http:\/\/localhost:\d{4}$/, // Autorise localhost sur n'importe quel port
  allowedHeaders: ['Content-Type'],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/excelWebApp')
  .then(() => {
    console.log('✅ MongoDB connecté');
    // Décommenter si besoin de vider la collection :
    mongoose.connection.db.collection('exceldatas').deleteMany({}),
    mongoose.connection.db.collection('statisticsdatas').deleteMany({})
     .then(() => console.log('🗑️ Collection vidée'))
    .catch(err => console.log('Erreur de vidage :', err));
  })
  .catch(err => console.log('❌ Erreur MongoDB :', err));

app.use(express.json());

// Routes
app.use('/upload', uploadRoute); // Pour l'import Excel
app.use('/api/excel', excelRoutes); // Collection Excel classique
app.use('/api/excel', statisticsRoutes); // Pour l'import Excel COLLECTION2
app.use('/api/statistics', statisticsExcelRoutes);//COLLECTION2
app.use('/api/nbAccompagnement', nbAccompagnementsRoutes);


app.listen(5000, () => {
  console.log('🚀 Serveur en ligne sur le port 5000');
});



const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/excelStatisticsDataController');

// Créer une nouvelle donnée
router.post('/', statisticsController.createData);

// Lire toutes les données
router.get('/', statisticsController.getAllData);

// Lire une donnée spécifique par ID
router.get('/:id', statisticsController.getDataById);

// Modifier une donnée
router.put('/:id', statisticsController.updateData);

// Supprimer une donnée
router.delete('/:id', statisticsController.deleteData);

module.exports = router;
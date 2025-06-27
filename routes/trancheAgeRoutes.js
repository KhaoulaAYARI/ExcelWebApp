const express = require('express');
const router = express.Router();
const StatisticsData = require('../models/StatisticsData');

router.get('/', async (req, res) => {
  try {
    const totalAgeGroups = await StatisticsData.aggregate([
      {
        $group: {
          _id: null,
          totalMoins12ans: { $sum: "$tranchesAgeDesUsagers.moins12ans" },
          totalEntre12_18ans: { $sum: "$tranchesAgeDesUsagers.entre12_18ans" },
          totalEntre18_35ans: { $sum: "$tranchesAgeDesUsagers.entre18_35ans" },
          totalEntre35_60ans: { $sum: "$tranchesAgeDesUsagers.entre35_60ans" },
          totalPlus60ans: { $sum: "$tranchesAgeDesUsagers.plus60ans" }
        }
      }
    ]);

    res.json(totalAgeGroups[0]); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;

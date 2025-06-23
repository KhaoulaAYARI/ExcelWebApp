const express=require('express');
const router=express.Router();
const StatisticsData=require('../models/StatisticsData');

router.get('/', async(req,res)=>{
      try {
    // Groupement par année et mois extraits du champ month
    const summary = await StatisticsData.aggregate([
      {
        $addFields: {
          year: { $toInt: { $substr: ["$month", 3, 4] } }, 
          //$substr: extrait les 4 premiers caractères de $month "2024"
          monthNum: { $toInt: { $substr: ["$month", 0, 2] } }
          //$substr: extrait 2 caractères à partir du 6e (indice 5) "05"
        }
        /*{
            month: "2024-05",
            year: 2024,
            monthNum: 5,
            ...
            }*/
      },
      {
        $group: {
          _id: { year: "$year", month: "$monthNum" },
          totalCRA: { $sum: "$general.nbCRA" },
          totalAccompagnements: { $sum: "$general.nbAccompagnements" },
          totalUsagers: { $sum: "$general.nbUsagersAccompagnes" },
          totalIndiv: { $sum: "$general.nbAccompagnementsIndiv" },
          totalAteliers: { $sum: "$general.nbAteliersCollectifs" },
          totalParticipants: { $sum: "$general.totalParticipantsAuxAteliers" },
          totalDemandes: { $sum: "$general.nbDemandesPonctuelles" },
          totalADomicile: { $sum: "$canauxAccompagnements.aDomicile" },
          totalADistance: { $sum: "$canauxAccompagnements.aDistance" },
          totalLieuActivite: { $sum: "$canauxAccompagnements.lieuActivite" },
          totalAutres: { $sum: "$canauxAccompagnements.autres" }

        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    res.json(summary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});
module.exports = router;
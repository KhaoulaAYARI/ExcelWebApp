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
          totalAutres: { $sum: "$canauxAccompagnements.autres" },
          totalMoins30min: { $sum: "$dureeDesAccompagnements.moins30min" },
          totalEntre30_60min: { $sum: "$dureeDesAccompagnements.entre30_60min" },
          totalEntre60_120min: { $sum: "$dureeDesAccompagnements.entre60_120min" },
          totalPlus120min: { $sum: "$dureeDesAccompagnements.plus120min" },
          totalMoins12ans: { $sum: "$tranchesAgeDesUsagers.moins12ans" },
          totalEntre12_18ans: { $sum: "$tranchesAgeDesUsagers.entre12_18ans" },
          totalEntre18_35ans: { $sum: "$tranchesAgeDesUsagers.entre18_35ans" },
          totalEntre35_60ans: { $sum: "$tranchesAgeDesUsagers.entre35_60ans" },
          totalPlus60ans: { $sum: "$tranchesAgeDesUsagers.plus60ans" },
          totalScolarise: { $sum: "$statutDesUsagers.scolarise" },
          totalSansEmploi: { $sum: "$statutDesUsagers.sansEmlpoi" },
          totalEnEmploi: { $sum: "$statutDesUsagers.enEmploi" },
          totalRetraite: { $sum: "$statutDesUsagers.retraite" },
          totalNonRenseigne: { $sum: "$statutDesUsagers.nonRenseigne" },



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
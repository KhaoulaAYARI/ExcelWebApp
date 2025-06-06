const xlsx = require("xlsx");
const StatisticsData = require("../models/StatisticsData");

exports.uploadStatisticsData = async (req, res) => {
  try {
        // 1. Vérifier qu'un fichier a bien été envoyé
      if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
        // 2. Lire le fichier Excel
    const workbook = xlsx.read(req.file.buffer);
    const firstSheetName = workbook.SheetNames[0]; // Prendre le 1er onglet
    const worksheet = workbook.Sheets[firstSheetName];

    // 3. Convertir en JSON simple
    const excelData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
   // 4. Trouver les colonnes de mois (ex: "10/2024")
   const months=[];
    const headerRow = excelData[1]; // La 2ème ligne contient les mois
    for (let cell of headerRow){
      if(typeof cell==='string' && cell.includes('/')){
        months.push(cell);
      }
    }
   // 5. Préparer les données pour MongoDB
    const statsToSave=[];

    for (let month of months){
      const monthIndex=headerRow.indexOf(month);
      // Créer un objet pour ce mois
       const monthlyData = {
        month: month,
        general: {
          nbCRA: getValue(excelData, "nbCRA", monthIndex),
          nbAccompagnements: getValue(excelData, "nbAccompagnements", monthIndex),
          nbUsagersAccompagnes: getValue(excelData, "nbUsagersAccompagnes", monthIndex),
          nbAccompagnementsIndiv: getValue(excelData, "nbAccompagnementsIndiv", monthIndex),
          nbAteliersCollectifs: getValue(excelData, "nbAteliersCollectifs", monthIndex),
          totalParticipantsAuxAteliers: getValue(excelData, "totalParticipantsAuxAteliers", monthIndex),
          nbDemandesPonctuelles: getValue(excelData, "nbDemandesPonctuelles", monthIndex),
        },
        accompagnementsPoursuivis:{
          nbPoursuiteAccompagnementIndiv: getValue(excelData, "nbPoursuiteAccompagnementIndiv", monthIndex),
          nbPoursuiteAtelierCollectif: getValue(excelData, "nbPoursuiteAtelierCollectif", monthIndex),
          nbRedirectionsAutreStructure: getValue(excelData, "nbRedirectionsAutreStructure", monthIndex),
        },
        canauxAccompagnements:{
          aDomicile: getValue(excelData, "aDomicile", monthIndex),
          aDistance: getValue(excelData, "aDistance", monthIndex),
          lieuActivite: getValue(excelData, "lieuActivite", monthIndex),
          autres: getValue(excelData, "autres", monthIndex),
        },
        tempsEnAccompagnements:{
          totalHeures: getValue(excelData, "totalHeures", monthIndex),
          individuels: getValue(excelData, "individuels", monthIndex),
          collectifs: getValue(excelData, "collectifs", monthIndex),
          ponctuels: getValue(excelData, "ponctuels", monthIndex),
        },
        dureeDesAccompagnements:{
          moins30min: getValue(excelData, "moins30min", monthIndex),
          entre30_60min: getValue(excelData, "entre30_60min", monthIndex),
          entre60_120min: getValue(excelData, "entre60_120min", monthIndex),
          plus120min: getValue(excelData, "plus120min", monthIndex),
        },
        tranchesAgeDesUsagers:{
          moins12ans: getValue(excelData, "moins12ans", monthIndex),
          entre12_18ans: getValue(excelData, "entre12_18ans", monthIndex),
          entre18_35ans: getValue(excelData, "entre18_35ans", monthIndex),
          entre35_60ans: getValue(excelData, "entre35_60ans", monthIndex),
          plus60ans: getValue(excelData, "plus60ans", monthIndex),
        },
        statutDesUsagers:{
          scolarise: getValue(excelData, "scolarise", monthIndex),
          sansEmlpoi: getValue(excelData, "sansEmlpoi", monthIndex),
          enEmploi: getValue(excelData, "enEmploi", monthIndex),
          retraite: getValue(excelData, "retraite", monthIndex),
          nonRenseigne: getValue(excelData, "nonRenseigne", monthIndex),
        },
        themesDesAccompagnements:{
          accompagnerUnAidant: getValue(excelData, "accompagnerUnAidant", monthIndex),
          budget: getValue(excelData, "budget", monthIndex),
          gestionDeContenusNumeriques: getValue(excelData, "gestionDeContenusNumeriques", monthIndex),
          courriels: getValue(excelData, "courriels", monthIndex),
          cultureNumerique: getValue(excelData, "cultureNumerique", monthIndex),
          demarcheEnLigne: getValue(excelData, "demarcheEnLigne", monthIndex),
          diagnosticNumerique: getValue(excelData, "diagnosticNumerique", monthIndex),
          echangeAvecSesProches: getValue(excelData, "echangeAvecSesProches", monthIndex),
          prendreEnMainDuMateriel: getValue(excelData, "prendreEnMainDuMateriel", monthIndex),
          fraudeEtHarcelement: getValue(excelData, "fraudeEtHarcelement", monthIndex),
          naviguerSurInternet: getValue(excelData, "naviguerSurInternet", monthIndex),
          sante: getValue(excelData, "sante", monthIndex),
          scolaire: getValue(excelData, "scolaire", monthIndex),
          securiserEquipement: getValue(excelData, "securiserEquipement", monthIndex),
          smartphone: getValue(excelData, "smartphone", monthIndex),
          numeriqueTPE_PME: getValue(excelData, "numeriqueTPE_PME", monthIndex),
          bureautique: getValue(excelData, "bureautique", monthIndex),
          emlpoiEtFormation: getValue(excelData, "emlpoiEtFormation", monthIndex),
          autre: getValue(excelData, "autre", monthIndex),
          
        },
      };
      statsToSave.push(monthlyData);
    }

    // 6. Sauvegarder dans MongoDB 
     for (let stat of statsToSave) {
      await StatisticsData.findOneAndUpdate(
        { month: stat.month },
        stat,
        { upsert: true }
      );
    }
    // 7. Réponse de succès
    res.send({
      success: true,
      message: `Données pour ${statsToSave.length} mois enregistrées`
    });

  } catch (error) {
    // 8. Gestion des erreurs
    console.error("Erreur lors de l'import:", error);
    res.status(500).send('Une erreur est survenue lors de l\'import');
  }
};
// Fonction utilitaire pour trouver une valeur dans le tableau Excel
    function getValue(excelData, label, monthIndex) {
  for (let row of excelData) {
    if (row[0] === label) {
      return row[monthIndex];
    }
  }
  return null; 
}
 

  






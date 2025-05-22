const xlsx = require("xlsx");
const ExcelData = require("../models/ExcelData");

exports.uploadExcel = async (req, res) => {
  try {
    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData = xlsx.utils.sheet_to_json(sheet);

    // Utilise la fonction robuste pour les dates
    const data = rawData.map(item => ({
      ...item,
      dateAccompagnement: parseExcelDate(item.dateAccompagnement),
      dateCreation: parseExcelDate(item.dateCreation)
    }));

    console.log("🧪 Exemple de données après conversion :", data[0]);

    await ExcelData.insertMany(data);
    res.status(200).json({ message: "Données importées avec succès" });

  } catch (error) {
    console.error("❌ Erreur complète lors de l'import :", error);
    res.status(500).json({ message: "Erreur lors de l'import", error: error.message });
  }
};

// Ajoute en bas du fichier cette fonction utilitaire
function parseExcelDate(value) {
  if (typeof value === 'number') {
    const utc_days = Math.floor(value - 25569);
    const utc_value = utc_days * 86400;
    return new Date(utc_value * 1000);
  }

  if (typeof value === 'string') {
    const date = new Date(value);
    if (!isNaN(date)) return date;
  }

  return null;
}


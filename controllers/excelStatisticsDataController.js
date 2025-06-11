const StatisticsData = require('../models/StatisticsData');

// Créer une nouvelle donnée
exports.createData = async (req, res) => {
  try {
    console.log("📥 Reçu :", req.body);
    const newData = new StatisticsData(req.body);
    await newData.save();
    res.status(201).json({ success: true, message: 'Donnée enregistrée avec succès' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Un enregistrement pour ce mois existe déjà." });
    }
    res.status(400).json({ error: err.message });
  }
};


// Lire toutes les données
exports.getAllData = async (req, res) => {
  try {
    const data = await StatisticsData.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lire une donnée spécifique
exports.getDataById = async (req, res) => {
  try {
    const data = await StatisticsData.findById(req.params.id);
    if (!data) return res.status(404).json({ error: 'Not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Modifier une donnée
exports.updateData = async (req, res) => {
  try {
    const updated = await StatisticsData.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer une donnée
exports.deleteData = async (req, res) => {
  try {
    const deleted = await StatisticsData.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

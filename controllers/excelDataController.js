const ExcelData = require('../models/ExcelData');

// Créer une nouvelle donnée
exports.createData = async (req, res) => {
  try {
    const newData = new ExcelData(req.body);
    await newData.save();
    res.status(201).json(newData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Lire toutes les données
exports.getAllData = async (req, res) => {
  try {
    const data = await ExcelData.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lire une donnée spécifique
exports.getDataById = async (req, res) => {
  try {
    const data = await ExcelData.findById(req.params.id);
    if (!data) return res.status(404).json({ error: 'Not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Modifier une donnée
exports.updateData = async (req, res) => {
  try {
    const updated = await ExcelData.findByIdAndUpdate(req.params.id, req.body, {
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
    const deleted = await ExcelData.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

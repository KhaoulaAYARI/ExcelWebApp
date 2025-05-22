const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadController = require("../controllers/uploadController");

// Configurer multer pour stocker dans /uploads
const upload = multer({ dest: "uploads/" });

// Route POST pour uploader un fichier Excel
router.post("/", upload.single("file"), uploadController.uploadExcel);

module.exports = router;

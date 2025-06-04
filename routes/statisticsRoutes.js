const express=require("express");
const router=express.Router();
const multer=require("multer");
const uploadStatisticsController=require("../controllers/uploadStatisticsController");

// Configuration Multer
const upload=multer({
    dest: "uploads/",
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('excel') || file.mimetype.includes('spreadsheet')) {
      cb(null, true);
    } else {
      cb(new Error('Seuls les fichiers Excel sont autorisés'), false);
    }
  }
});

// Route POST pour uploader un fichier Excel
router.post("/uploadStatistics", upload.single("excelFile"), uploadController.uploadExcel);

module.exports = router;
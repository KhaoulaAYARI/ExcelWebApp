const express=require("express");
const router=express.Router();
const multer=require("multer");
const uploadStatisticsController=require("../controllers/uploadStatisticsController");

// Configuration Multer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('excel') || file.mimetype.includes('spreadsheetml')) {
      cb(null, true);
    } else {
      cb(new Error('Seuls les fichiers Excel sont autorisés'), false);
    }
  }
});


// Route POST pour uploader un fichier Excel
router.post("/uploadStatistics", upload.single("file"),  uploadStatisticsController.uploadStatisticsData);

module.exports = router;
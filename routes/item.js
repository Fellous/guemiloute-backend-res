const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const multer = require("multer");
const path = require("path");

// Configuration de Multer pour gérer les uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../guemiloute-test/public/img/")); // Dossier du frontend
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${
      file.originalname
    }`;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

// Routes
router.post("/", upload.single("image"), itemController.createItem);
router.get("/", itemController.getItems);
router.put("/:id", itemController.updateItem);
router.delete("/:id", itemController.deleteItem);

module.exports = router;

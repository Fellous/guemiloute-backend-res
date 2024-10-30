const express = require("express");
const router = express.Router();
const borrowController = require("../controllers/borrowController");

router.post("/", borrowController.createBorrow);
router.get("/", borrowController.getBorrows);
router.put("/:id", borrowController.updateBorrow);
router.delete("/:id", borrowController.deleteBorrow);

module.exports = router;

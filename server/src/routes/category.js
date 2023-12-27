const categoryController = require("../controllers/categoryController");

const router = require("express").Router();

// GET ALL CATEGORIES
router.get("/", categoryController.getAllCategories);

module.exports = router;
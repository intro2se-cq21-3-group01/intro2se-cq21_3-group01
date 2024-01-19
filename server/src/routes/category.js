const categoryController = require("../controllers/categoryController");

const router = require("express").Router();

// GET CATEGORY BY ID
router.get("/:id", categoryController.getCategoryByID);

// GET ALL CATEGORIES
router.get("/", categoryController.getAllCategories);

// GET ALL CATEGORIES
router.post("/add", categoryController.addCategory);

// UPDATE CATEGORY
router.post("/update/:id", categoryController.updateCategory);

// DELETE CATEGORY
router.get("/delete/:id", categoryController.deleteCategory);

module.exports = router;
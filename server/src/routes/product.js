const productController = require("../controllers/productController");

const router = require("express").Router();

// GET ALL PRODUCTS
router.get("/", productController.getAllProducts);

module.exports = router;
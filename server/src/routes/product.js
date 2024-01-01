const productController = require("../controllers/productController");

const router = require("express").Router();

// GET ALL PRODUCTS
router.get("/", productController.getAllProducts);

// GET SIMILAR PRODUCTS
router.get("/similar/:id", productController.getSimilarProducts);

// GET PRODUCT BY ID
router.get("/:id", productController.getProductById);

module.exports = router;
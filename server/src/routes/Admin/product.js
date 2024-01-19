const productController = require("../../controllers/Admin/productController");

const router = require("express").Router();


// GET ALL PRODUCTS
router.get("/", productController.getAllProducts);

// GET PRODUCT BY ID
router.get("/:id", productController.getProductById);

// ADD PRODUCT 
router.post("/add", productController.addProduct);

// DELETE PRODUCT 
router.get("/delete/:id", productController.deleteProduct);

// UPDATE PRODUCT 
router.post("/update/:id", productController.updateProduct);

module.exports = router;
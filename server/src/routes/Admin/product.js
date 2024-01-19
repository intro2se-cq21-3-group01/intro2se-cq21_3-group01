const productController = require("../../controllers/Admin/productController");
const authMiddleware = require("../../middleware/AdminMiddleware");
const router = require("express").Router();


// GET ALL PRODUCTS
router.get("/",authMiddleware.verifyTokenAndAdminAuth, productController.getAllProducts);

// GET PRODUCT BY ID
router.get("/:id",authMiddleware.verifyTokenAndAdminAuth, productController.getProductById);

// ADD PRODUCT 
router.post("/add",authMiddleware.verifyTokenAndAdminAuth, productController.addProduct);

// DELETE PRODUCT 
router.get("/delete/:id",authMiddleware.verifyTokenAndAdminAuth, productController.deleteProduct);

// UPDATE PRODUCT 
router.post("/update/:id",authMiddleware.verifyTokenAndAdminAuth, productController.updateProduct);

module.exports = router;
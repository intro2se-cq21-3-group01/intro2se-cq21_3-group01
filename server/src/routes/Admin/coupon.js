const couponController = require("../../controllers/Admin/couponController");
const authMiddleware = require("../../middleware/AdminMiddleware");
const router = require("express").Router();


// GET ALL COUPONS
router.get("/",authMiddleware.verifyToken, couponController.getAllCoupons);

// GET COUPON BY ID
router.get("/:id",authMiddleware.verifyToken, couponController.getCouponById);

// ADD COUPON 
router.post("/add",authMiddleware.verifyToken, couponController.addCoupon);

// DELETE COUPON 
router.get("/delete/:id",authMiddleware.verifyToken, couponController.deleteCoupon);

// UPDATE COUPON 
router.post("/update/:id",authMiddleware.verifyToken, couponController.updateCoupon);

module.exports = router;
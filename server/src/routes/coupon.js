const express = require("express");
const router = express.Router();

const couponController = require("../controllers/couponController");

// GET ALL COUPONS
router.get("/", couponController.getAllCoupons);

// ADD A COUPONS
router.get("/", couponController.addCoupon);

// APPLY A COUPON
router.post("/apply", couponController.applyCoupon);

// DELETE A COUPON
router.delete("/", couponController.deleteCoupon);

// UPDATE A COUPON
router.put("/", couponController.updateCoupon);

module.exports = router;
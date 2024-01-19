const Coupon = require("../models/Coupon")


const couponController = {
    // ADD COUPON
    addCoupon: async (req, res) => {
        try {
            const { code, discount, quantity } = req.body;

            const existingCoupon = await Coupon.findOne({ code });

            if (existingCoupon) {
                return res.status(400).json({
                    success: false,
                    message: "Coupon code already exists!"
                });
            }

            const newCoupon = new Coupon({
                code,
                discount,
                quantity
            });

            await newCoupon.save();

            res.status(201).json({
                success: true,
                message: "Coupon added successfully!",
                data: newCoupon
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    },
    // APPLY COUPON
    applyCoupon: async (req, res) => {
        try {
            const { code } = req.body

            // Find the coupon by code
            const coupon = await Coupon.findOne({ code });

            // Check the coupon exists
            if (!coupon) {
                return res.status(404).json({
                    success: false,
                    message: "The coupon is invalid !"
                });
            }

            // Check if the coupon is still valid
            if (coupon.quantity === 0) {
                return res.status(200).json({
                    success: true,
                    message: "The coupon is no available !"
                });
            }

            res.status(200).json({
                success: true,
                message: "Coupon applied successfully !",
                data: coupon.discount
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    },
    // GET ALL COUNPONS
    getAllCoupons: async (req, res) => {
        try {
            const coupons = await Coupon.find();

            res.status(200).json({
                success: true,
                message: "Get all coupons successfully !",
                data: coupons
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    },
    // DELETE A COUPON
    deleteCoupon: async (req, res) => {
        try {
            const { id } = req.params;

            const deletedCoupon = await Coupon.findByIdAndDelete(id);

            if (!deletedCoupon) {
                return res.status(404).json({
                    success: false,
                    message: "Coupon not found!"
                });
            }

            res.status(200).json({
                success: true,
                message: "Coupon deleted successfully!",
                data: deletedCoupon
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    },
    // UPDATE A COUPN
    updateCoupon: async (req, res) => {
        try {
            const { id } = req.params;
            const { code, discount, quantity } = req.body;

            const updatedCoupon = await Coupon.findByIdAndUpdate(
                id,
                { code, discount, quantity },
                { new: true }
            );

            if (!updatedCoupon) {
                return res.status(404).json({
                    success: false,
                    message: "Coupon not found!"
                });
            }

            res.status(200).json({
                success: true,
                message: "Coupon updated successfully!",
                data: updatedCoupon
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    }
}

module.exports = couponController;
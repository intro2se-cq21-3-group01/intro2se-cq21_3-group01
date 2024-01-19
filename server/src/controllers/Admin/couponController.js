const Coupon = require('../../models/Coupon');
const CouponController = {  

    getCouponById: async (req, res) => {
        try {
            const id = req.params.id;

            const coupon = await Coupon.findById(id);

            res.status(200).json({
                success: true,
                message: 'Get coupon successfully !',
                data: coupon
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err,
                data: {}
            });
        }
    },

    getAllCoupons: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const keyWordSearch = req.query.search;

            const perPage = parseInt(req.query.limit) || 8;

            const totalProducts = await Coupon.countDocuments();

            const totalPage = Math.ceil(totalProducts / perPage);
            const skip = (page - 1) * perPage;

            let query = {};
    
            if (keyWordSearch) {
                query.$or = [
                    { code: { $regex: new RegExp(keyWordSearch, 'i') } },
                    { id: { $regex: new RegExp(keyWordSearch, 'i') } }
                ];
            }

            let coupons;
    
            coupons = await Coupon.find(query).skip(skip).limit(perPage);
            res.status(200).json({
                success: true,
                message: 'Get all coupon successfully !',
                data: coupons,
                totalPage: totalPage
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err,
                data: []
            });
        }
    },

    addCoupon: async (req, res) => {
        try {
            const newCoupon = await new Coupon({
                code: req.body.code,
                discount: req.body.discount,
                quantity: req.body.quantity,
                description: req.body.description,
            })
            console.log(newCoupon);
            const coupon = await newCoupon.save();
            console.log(coupon);
            res.status(200).json({
                success: true,
                message: 'Add coupon successfully !',
                data: coupon
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err,
                data: {}
            });
        }
    },

    deleteCoupon: async (req , res) => {
        try {
            await Coupon.deleteOne({_id: req.params.id})
            res.status(200).json({
                success: true,
                message: 'Delete successfully!',
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err,
                data: {}
            });
        }
    },

    updateCoupon: async (req, res) => {
        try {
            const updateCoupon = {
                code: req.body.code,
                discount: req.body.discount,
                quantity: req.body.quantity,
                description: req.body.description,
            }

            const updatedCoupon = await Coupon.findByIdAndUpdate(req.params.id, updateCoupon, { new: true });

            if (!updatedCoupon) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found',
                    data: {}
                });
            }
            
            res.status(200).json({
                success: true,
                message: 'update product successfully !',
                data: updatedCoupon
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err,
                data: {}
            });
        }
    },
}

module.exports = CouponController;
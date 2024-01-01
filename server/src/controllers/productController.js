const Product = require('../models/Product');

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find();

            res.status(200).json({
                success: true,
                message: 'Get all products successfully !',
                data: products
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err,
                data: []
            });
        }
    },
    getSimilarProducts: async (req, res) => {
        try {
            const id = req.params.id;
            const product = await Product.findById(id);
            const productCategory = product.categories;

            const similarProducts = await Product.find({
                categories: { $in: productCategory },
                _id: { $ne: id }
            }).limit(3);

            res.status(200).json({
                success: true,
                message: 'Get similar products successfully!',
                data: similarProducts
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err,
                data: []
            });
        }
    },
    getProductById: async (req, res) => {
        try {
            const id = req.params.id;

            const product = await Product.findById(id);

            res.status(200).json({
                success: true,
                message: 'Get product successfully !',
                data: product
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err,
                data: {}
            });
        }
    }
}

module.exports = productController;
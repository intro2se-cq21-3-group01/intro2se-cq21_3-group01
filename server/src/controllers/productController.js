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
    }
}

module.exports = productController;
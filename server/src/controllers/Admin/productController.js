const Product = require('../../models/Product');
const Category = require('../../models/Category');
const Order = require('../../models/Order');
const productController = {   
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
    },

    getAllProducts: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const keyWordSearch = req.query.search;
            const sort = req.query.sort;

            const perPage = parseInt(req.query.limit) || 8;

            const totalProducts = await Product.countDocuments();
            const totalCategories = await Category.countDocuments();
            const totalSoldOut = await Product.countDocuments({ quantity: 0 });

            const result = await Order.aggregate([
                {
                    $match: { status: 'COMPLETED' }
                },
                {
                    $group: {
                        _id: null,
                        totalAmount: { $sum: '$totalPrice' }
                    }
                }
            ]);
            
            const totalAmount = result.length > 0 ? result[0].totalAmount : 0;

            const totalPage = Math.ceil(totalProducts / perPage);
            const skip = (page - 1) * perPage;

            let query = {};
    
            if (keyWordSearch) {
                query.$or = [
                    { name: { $regex: new RegExp(keyWordSearch, 'i') } },
                    { id: { $regex: new RegExp(keyWordSearch, 'i') } }
                ];
            }
            //const products = await Product.find();

            let products;
    
            
            if (sort === "true") {
                products = await Product.find(query).sort({ name: 1 }).skip(skip).limit(perPage);
            } else if(sort === "false"){
                products = await Product.find(query).skip(skip).limit(perPage);
            }
            res.status(200).json({
                success: true,
                message: 'Get all products successfully !',
                data: products,
                totalPage: totalPage,
                totalProducts: totalProducts,
                totalCategories: totalCategories,
                totalSoldOut: totalSoldOut,
                totalAmount: totalAmount,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err,
                data: []
            });
        }
    },

    addProduct: async (req, res) => {
        try {
            const newProduct = await new Product({
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                quantity: req.body.quantity,
                imgUrl: req.body.imgUrl,
                categories: req.body.categories,
            })
            const product = await newProduct.save();
            res.status(200).json({
                success: true,
                message: 'Add product successfully !',
                data: product
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err,
                data: {}
            });
        }
    },

    deleteProduct: async (req , res) => {
        try {
            await Product.deleteOne({_id: req.params.id})
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

    updateProduct: async (req, res) => {
        try {
            const updateProduct = {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                quantity: req.body.quantity,
                imgUrl: req.body.imgUrl,
                categories: req.body.categories,
            }

            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateProduct, { new: true });

            if (!updatedProduct) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found',
                    data: {}
                });
            }
            
            res.status(200).json({
                success: true,
                message: 'update product successfully !',
                data: updatedProduct
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

module.exports = productController;
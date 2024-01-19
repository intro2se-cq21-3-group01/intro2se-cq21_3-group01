const Category = require('../models/Category');
const Product = require('../models/Product');

const categoryController = {
    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.find();

            res.status(200).json({
                success: true,
                message: 'Get all categories successfully !',
                data: categories
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err,
                data: []
            });
        }
    },

    addCategory: async (req, res) => {
        try {
            const newCategory = await new Category({
                name: req.body.name,
            })
            const category = await newCategory.save();
            res.status(200).json({
                success: true,
                message: 'Get all categories successfully !',
                data: category
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err,
                data: []
            });
        }
    },
    getCategoryByID: async (req, res) => {
        try {
            const id = req.params.id;

            const category = await Category.findById(id);
            res.status(200).json({
                success: true,
                message: 'Get category successfully !',
                data: category
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err,
                data: []
            });
        }
    },

    updateCategory: async (req, res) => {
        try {
            const updateCategory = {
                name: req.body.name,
            }

            const updatedProduct = await Category.findByIdAndUpdate(req.params.id, updateCategory, { new: true });
            res.status(200).json({
                success: true,
                message: 'update category successfully !',
                data: updatedProduct
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err,
                data: []
            });
        }
    },
    
    deleteCategory: async (req, res) => {
        try {
            await Category.deleteOne({_id: req.params.id})
            res.status(200).json({
                success: true,
                message: 'delete category successfully !',
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err,
                data: []
            });
        }
    },
}

module.exports = categoryController;
const Order = require('../models/Order');
const authController = require('./authController');

// Controller methods for handling orders
const orderController = {
    // Create a new order
    createOrder: async (req, res) => {
        try {
            const tokenArray = req.headers.authorization.split(' ');
            const accessToken = tokenArray[1];

            const decodedToken = authController.verifyToken(accessToken);
            console.log({ ...req.body, "user": decodedToken.id });
            const newOrder = await Order.create({ ...req.body, "user": decodedToken.id });

            console.log(newOrder);
            res.status(201).json({
                success: true,
                message: "Create order successfully !",
                data: newOrder
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Get all orders
    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.find().populate('user items.product');
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Get order by ID
    getOrderById: async (req, res) => {
        try {
            const order = await Order.findById(req.params.orderId).populate('user items.product');
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Update order by ID
    updateOrderById: async (req, res) => {
        try {
            const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, req.body, { new: true });
            if (!updatedOrder) {
                return res.status(404).json({ error: 'Order not found' });
            }
            res.status(200).json(updatedOrder);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Delete order by ID
    deleteOrderById: async (req, res) => {
        try {
            const deletedOrder = await Order.findByIdAndRemove(req.params.orderId);
            if (!deletedOrder) {
                return res.status(404).json({ error: 'Order not found' });
            }
            res.status(200).json(deletedOrder);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = orderController;

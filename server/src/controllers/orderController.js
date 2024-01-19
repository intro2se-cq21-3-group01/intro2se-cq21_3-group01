const Order = require('../models/Order');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon');

const authMiddleware = require('../middleware/authMiddleware');

const orderController = {
    // Create a new order
    createOrder: async (req, res) => {
        try {
            const tokenArray = req.headers.authorization.split(' ');
            const accessToken = tokenArray[1];
            const decodedToken = authMiddleware.verifyToken(accessToken);

            // Reduce quantity of products in the order
            const items = req.body.items;

            items.forEach(async (item) => {
                try {
                    const id = item.product._id;
                    const product = await Product.findOne({ _id: id });

                    if (product) {
                        product.quantity -= item.quantity;
                        await product.save();
                    }
                } catch (error) {
                    console.error('Error updating product quantity:', error);
                }
            });

            // Reduce quantity of a discount coupon (if applied)
            const discountCode = req.body.discountCode;

            if (discountCode) {
                try {
                    const coupon = await Coupon.findOne({ code: discountCode });
                    coupon.quantity--;

                    await coupon.save();
                } catch (error) {
                    console.error('Error updating coupon quantity:', error);
                }
            }

            // Create a new order in the database
            const newOrder = await Order.create({ ...req.body, "user": decodedToken.id });

            res.status(200).json({
                success: true,
                message: "Create order successfully !",
                data: newOrder
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    // Get orders by user
    getOrdersByUser: async (req, res) => {
        try {
            const tokenArray = req.headers.authorization.split(' ');
            const accessToken = tokenArray[1];
            const decodedToken = authMiddleware.verifyToken(accessToken);

            const orders = await Order.find({ user: decodedToken.id })
                .populate('items.product')
                .sort({ date: -1 });

            res.status(200).json({
                success: true,
                message: "Get order by users successfully !",
                data: orders
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: true,
                message: 'Internal Server Error',
                data: {}
            });
        }
    },
    // Get all orders
    getAllOrders: async (req, res) => {
        try {
            const { page, limit, filter, searchQuery } = req.query;
            const offset = (page - 1) * limit;

            // Xây dựng điều kiện lọc dựa trên giá trị filter
            const filterCondition = filter && filter !== 'ALL' ? { status: filter } : {};
            const searchCondition = searchQuery ? {
                $or: [
                    { 'name': { $regex: searchQuery, $options: 'i' } },
                    { 'phone': { $regex: searchQuery, $options: 'i' } },
                    { 'address': { $regex: searchQuery, $options: 'i' } }
                ]
            } : {};
            const combinedCondition = {
                ...filterCondition,
                ...searchCondition
            };

            const orders = await Order.find(combinedCondition)
                .populate('user items.product')
                .sort({ date: -1 })
                .skip(offset)
                .limit(limit)
                .exec()

            const totalOrders = await Order.countDocuments(combinedCondition).exec()

            res.status(200).json({
                success: true,
                message: 'Get all products successfully!',
                totalPages: Math.ceil(totalOrders / limit),
                data: orders
            });
        } catch (error) {
            console.log(error);
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

            res.status(200).json({
                success: true,
                message: 'Order updated successfully!',
                data: updatedOrder
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    // Change status order by ID
    changeStatusOrder: async (req, res) => {
        try {
            const { orderId, newStatus } = req.body;
            // Kiểm tra xem newStatus có nằm trong enum được định nghĩa hay không
            if (!Order.schema.path('status').enumValues.includes(newStatus)) {
                return res.status(400).json({ error: 'Invalid status value' });
            }

            // Update status order
            const updatedOrder = await Order.findByIdAndUpdate(
                orderId,
                { status: newStatus },
                { new: true }
            );

            if (!updatedOrder) {
                return res.status(404).json({
                    success: false,
                    message: 'Order not found'
                });
            }

            res.status(200).json({
                success: true,
                message: `Order status changed to ${newStatus} successfully!`,
                data: updatedOrder
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    // Delete order by ID
    deleteOrderById: async (req, res) => {
        try {
            const { orderId } = req.params;
            const deletedOrder = await Order.findByIdAndDelete(orderId);
            // const deletedOrder = await Order.find(orderId);

            if (!deletedOrder) {
                return res.status(404).json({
                    success: false,
                    message: 'Order not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Order deleted successfully!',
                data: deletedOrder
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = orderController;

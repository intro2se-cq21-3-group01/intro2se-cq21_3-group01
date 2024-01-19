const moment = require('moment');
const Order = require('../models/Order');
const Product = require('../models/Product');

const analysisController = {
    getTop5BestSellingProducts: async (req, res) => {
        try {
            if (req.params.timeRange === "all") {
                const topProducts = await Order.aggregate([
                    {
                        $unwind: '$items',
                    },
                    {
                        $group: {
                            _id: '$items.product',
                            totalQuantity: { $sum: '$items.quantity' },
                        },
                    },
                    {
                        $sort: { totalQuantity: -1 },
                    },
                    {
                        $limit: 5,
                    },
                    {
                        $lookup: {
                            from: 'products',
                            localField: '_id',
                            foreignField: '_id',
                            as: 'productDetails',
                        },
                    },
                ]);


                return res.status(200).json({
                    success: true,
                    message: "Get top products successfully!",
                    data: topProducts
                });
            }

            // Xử lý thời gian
            const startDate = moment().startOf(req.params.timeRange);
            const endDate = moment().endOf(req.params.timeRange);

            // Truy vấn CSDL để lấy Top 5 sản phẩm bán chạy nhất
            const topProducts = await Order.aggregate([
                {
                    $match: {
                        date: { $gte: startDate.toDate(), $lte: endDate.toDate() },
                    },
                },
                {
                    $unwind: '$items',
                },
                {
                    $group: {
                        _id: '$items.product',
                        totalQuantity: { $sum: '$items.quantity' },
                    },
                },
                {
                    $sort: { totalQuantity: -1 },
                },
                {
                    $limit: 5,
                },
                {
                    $lookup: {
                        from: 'products', // Thay 'products' bằng tên của collection chứa thông tin sản phẩm
                        localField: '_id',
                        foreignField: '_id',
                        as: 'productDetails',
                    },
                },
            ]);


            res.json({
                success: true,
                message: "Get top products successfully!",
                data: topProducts
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getOrderCount: async (req, res) => {
        try {
            if (req.params.timeRange === "all") {
                const orderCount = await Order.countDocuments();

                return res.status(200).json({
                    success: true,
                    message: "Get total revenue successfully!",
                    data: orderCount
                });
            }

            // Xử lý thời gian
            const startDate = moment().startOf(req.params.timeRange);
            const endDate = moment().endOf(req.params.timeRange);

            // Truy vấn CSDL để lấy Số lượng order
            const orderCount = await Order.countDocuments({
                date: { $gte: startDate.toDate(), $lte: endDate.toDate() },
            });

            res.json({
                success: true,
                message: "Get total revenue successfully!",
                data: orderCount
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getTotalRevenue: async (req, res) => {
        try {
            if (req.params.timeRange === "all") {
                const totalRevenue = await Order.aggregate([
                    {
                        $group: {
                            _id: null,
                            total: { $sum: '$totalPrice' },
                        },
                    },
                ]);

                return res.status(200).json({
                    success: true,
                    message: "Get total revenue successfully!",
                    data: totalRevenue.length > 0 ? totalRevenue[0].total : 0
                });
            }
            // Xử lý thời gian
            const startDate = moment().startOf(req.params.timeRange);
            const endDate = moment().endOf(req.params.timeRange);

            // Truy vấn CSDL để lấy Tổng doanh thu
            const totalRevenue = await Order.aggregate([
                {
                    $match: {
                        date: { $gte: startDate.toDate(), $lte: endDate.toDate() },
                    },
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$totalPrice' },
                    },
                },
            ]);

            res.status(200).json({
                success: true,
                message: "Get total revenue successfully!",
                data: totalRevenue.length > 0 ? totalRevenue[0].total : 0
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getInventory: async (req, res) => {
        try {
            // Lấy danh sách sản phẩm từ bảng Product
            const products = await Product.find();

            // Tính toán số lượng sản phẩm còn tồn trong kho
            const inventory = [];
            let totalInventory = 0;

            for (const product of products) {
                const totalSold = await Order.aggregate([
                    {
                        $unwind: '$items',
                    },
                    {
                        $match: { 'items.product': product._id },
                    },
                    {
                        $group: {
                            _id: null,
                            totalQuantity: { $sum: '$items.quantity' },
                        },
                    },
                ]);

                const soldQuantity = totalSold.length > 0 ? totalSold[0].totalQuantity : 0;
                const remainingQuantity = product.quantity - soldQuantity;
                totalInventory += remainingQuantity;

                inventory.push({
                    id: product._id,
                    name: product.name,
                    img: product.imgUrl,
                    remainingQuantity
                });
            }

            res.json({
                success: true,
                message: "Get total inventory successfully!",
                data: totalInventory
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getDailyRevenue: async (req, res) => {
        try {
            const startDate = moment().startOf('week');
            const endDate = moment().endOf('week');

            const weeklyRevenue = await Order.aggregate([
                {
                    $match: {
                        date: { $gte: startDate.toDate(), $lte: endDate.toDate() },
                    },
                },
                {
                    $group: {
                        _id: { $dayOfWeek: '$date' },
                        total: { $sum: '$totalPrice' },
                    },
                },
                {
                    $sort: { _id: 1 },
                },
            ]);

            const data = weeklyRevenue.map((item) => ({
                name: `Ngày ${item._id}`,
                revenue: item.total,
            }));

            res.status(200).json({
                success: true,
                message: "Get weekly revenue successfully!",
                data: data,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getWeeklyRevenue: async (req, res) => {
        try {
            const startDate = moment().startOf('month');
            const endDate = moment().endOf('month');

            const monthlyWeeklyRevenue = await Order.aggregate([
                {
                    $match: {
                        date: { $gte: startDate.toDate(), $lte: endDate.toDate() },
                    },
                },
                {
                    $group: {
                        _id: { $week: '$date' },
                        total: { $sum: '$totalPrice' },
                    },
                },
                {
                    $sort: { _id: 1 },
                },
            ]);

            const data = monthlyWeeklyRevenue.map((item) => ({
                name: `Tuần ${item._id + 1}`,
                revenue: item.total,
            }));

            res.status(200).json({
                success: true,
                message: "Get monthly weekly revenue successfully!",
                data: data,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getMonthlyRevenue: async (req, res) => {
        try {
            const startDate = moment().startOf('year');
            const endDate = moment().endOf('year');

            const monthlyRevenue = await Order.aggregate([
                {
                    $match: {
                        date: { $gte: startDate.toDate(), $lte: endDate.toDate() },
                    },
                },
                {
                    $group: {
                        _id: { $month: '$date' },
                        total: { $sum: '$totalPrice' },
                    },
                },
                {
                    $sort: { _id: 1 },
                },
            ]);

            const data = monthlyRevenue.map((item) => ({
                name: `Tháng ${item._id}`,
                revenue: item.total,
            }));

            res.status(200).json({
                success: true,
                message: "Get monthly revenue successfully!",
                data: data,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = analysisController;



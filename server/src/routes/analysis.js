const express = require("express");
const router = express.Router();
const analysisController = require('../controllers/analysisController');
const authMiddleware = require("../middleware/AdminMiddleware");

// Top 5 sản phẩm bán chạy nhất
router.get('/top5bestsellingproducts/:timeRange',authMiddleware.verifyTokenAndAdminAuth, analysisController.getTop5BestSellingProducts);

// Số lượng order
router.get('/ordercount/:timeRange',authMiddleware.verifyTokenAndAdminAuth, analysisController.getOrderCount);

// Tổng doanh thu
router.get('/totalrevenue/:timeRange',authMiddleware.verifyTokenAndAdminAuth, analysisController.getTotalRevenue);

// Số lượng hàng tồn trong kho
router.get('/inventory',authMiddleware.verifyTokenAndAdminAuth, analysisController.getInventory);

// Tổng doanh thu từng ngày trong tuần
router.get("/revenue/week",authMiddleware.verifyTokenAndAdminAuth, analysisController.getDailyRevenue);

// Tổng doanh thu từng tuần trong tháng
router.get("/revenue/month",authMiddleware.verifyTokenAndAdminAuth, analysisController.getWeeklyRevenue);

// Tổng doanh thu từng tháng trong năm
router.get("/revenue/year",authMiddleware.verifyTokenAndAdminAuth, analysisController.getMonthlyRevenue);

module.exports = router;

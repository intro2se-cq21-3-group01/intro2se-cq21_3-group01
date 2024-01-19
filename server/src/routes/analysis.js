const express = require("express");
const router = express.Router();
const analysisController = require('../controllers/analysisController');
const authMiddleware = require("../middleware/authMiddleware");

// Top 5 sản phẩm bán chạy nhất
router.get('/top5bestsellingproducts/:timeRange', analysisController.getTop5BestSellingProducts);

// Số lượng order
router.get('/ordercount/:timeRange', analysisController.getOrderCount);

// Tổng doanh thu
router.get('/totalrevenue/:timeRange', analysisController.getTotalRevenue);

// Số lượng hàng tồn trong kho
router.get('/inventory', analysisController.getInventory);

// Tổng doanh thu từng ngày trong tuần
router.get("/revenue/week", analysisController.getDailyRevenue);

// Tổng doanh thu từng tuần trong tháng
router.get("/revenue/month", analysisController.getWeeklyRevenue);

// Tổng doanh thu từng tháng trong năm
router.get("/revenue/year", analysisController.getMonthlyRevenue);

module.exports = router;

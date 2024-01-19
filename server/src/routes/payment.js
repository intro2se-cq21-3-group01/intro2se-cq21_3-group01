const paymentController = require("../controllers/paymentController");

const router = require("express").Router();

// GET Payment
router.get("/", paymentController.payment);

module.exports = router;

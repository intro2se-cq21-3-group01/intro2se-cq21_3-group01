const paypalController = require("../controllers/paypalController");
const orderController = require("../controllers/orderController");

const router = require("express").Router();

// CREATE ORDER
router.post("/", orderController.createOrder);

// CREATE PAYMENT
router.post("/paypal", async (req, res) => {
    try {
        // use the cart information passed from the front-end to calculate the order amount detals
        const { cart, totalPrice } = req.body;
        const data = { cart: cart, totalPrice: totalPrice };
        const { jsonResponse, httpStatusCode } = await paypalController.createOrder(data);

        res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
        console.error("Failed to create order:", error);
        res.status(500).json({ error: "Failed to create order." });
    }
});

// CAPTURE PAYMENT
router.post("/paypal/:orderID/capture", async (req, res) => {
    try {
        const { orderID } = req.params;
        const { jsonResponse, httpStatusCode } = await paypalController.captureOrder(orderID);

        res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
        console.error("Failed to create order:", error);
        res.status(500).json({ error: "Failed to capture order." });
    }
});


module.exports = router;
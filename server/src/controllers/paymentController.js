const paymentController = {
  payment: async (req, res) => {
    try {
      res.status(200).json({
        success: true,
        message: "Get payment successfully!",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err,
      });
    }
  },
};

module.exports = paymentController;

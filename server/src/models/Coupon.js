const mongoose = require('mongoose');

const counponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    discount: {
        type: Number,
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 9999
    },
    description: {
        type: String,
        required: true
    }
});

const Coupon = mongoose.model('Coupon', counponSchema);

module.exports = Coupon;

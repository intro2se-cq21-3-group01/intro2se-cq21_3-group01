const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        price: {
            type: Number,
            require: true,
        },
        description: {
            type: String,
        },
        quantity: {
            type: Number,
        },
        imgUrl: {
            type: String
        },
        categories: [{
            type: String
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
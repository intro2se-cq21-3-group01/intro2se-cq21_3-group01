const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            default: ''
        },
        gender: {
            type: String,
            enum: ['MALE', 'FEMALE', 'OTHER'],
            default: 'OTHER',
        },
        role: {
            type: String,
            enum: ['CUSTOMER', 'STAFF', 'ADMIN'],
            default: 'CUSTOMER',
        },
        resetPasswordToken: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
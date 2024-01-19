var mongoose = require('mongoose');

var Employeeschema = new mongoose.Schema(
    {
        username: {
            type: String, 
            required: true,
        },
        fullname: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        image: {
            type: String,
            required: true,
        },
        dob: {
            type: Date,
            required: true,
        },
        dateStart: {
            type: Date,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

var Users = mongoose.model('Employee', Employeeschema);

module.exports = Users;
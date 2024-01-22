const Employee = require('../../models/Employee');
const bcrypt = require("bcrypt");
const employeeController = {
    getAllEmployee: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const keyWordSearch = req.query.search;
            const sort = req.query.sort;
            const perPage = parseInt(req.query.limit) || 8;
    
            const totalEmployees = await Employee.countDocuments();
            const totalPage = Math.ceil(totalEmployees / perPage);
    
            const skip = (page - 1) * perPage;
    
            let query = {};
    
            if (keyWordSearch) {
                query.$or = [
                    { fullname: { $regex: new RegExp(keyWordSearch, 'i') } },
                    { id: { $regex: new RegExp(keyWordSearch, 'i') } }
                ];
            }
    
            let employees;
    
            if (sort === "true") {
                employees = await Employee.find(query).sort({ fullname: 1 }).skip(skip).limit(perPage);
            } else if(sort === "false"){
                employees = await Employee.find(query).skip(skip).limit(perPage);
            }
    
            res.status(200).json({
                success: true,
                message: 'Get all employees successfully!',
                data: employees,
                totalPage: totalPage
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
                data: []
            });
        }
    },
    
    getEmployeeById: async (req, res) => {
        try {
            const id = req.params.id;

            const employee = await Employee.findById(id);

            res.status(200).json({
                success: true,
                message: 'Get product successfully !',
                data: employee
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err,
                data: {}
            });
        }
    },

    addEmployee: async (req, res) => {
      try {
        console.log("zô");
        console.log(req.body);
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);
        const newEmployee = await new Employee({
            fullname: req.body.fullname,
            username: req.body.username,
            password: hashed,
            email: req.body.email,
            address: req.body.address,
            image: req.body.image,
            dob: req.body.dob,
            dateStart: req.body.dateStart,
            phone: req.body.phone,
        })

        const employee = await newEmployee.save();
        res.status(200).json({
            success: true,
            message: 'Add successfully !',
            data: employee
        });
      } catch (err) {
        res.status(500).json({
            success: false,
            message: err,
            data: {}
        });
      }
    },
    
    editEmployee: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            
            const editedEmployee = {
                fullname: req.body.fullname,
                username: req.body.username,
                password: hashed,
                email: req.body.email,
                address: req.body.address,
                image: req.body.image,
                dob: req.body.dob,
                dateStart: req.body.dateStart,
                phone: req.body.phone,
            };
            // Update the employee using findByIdAndUpdate
            const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, editedEmployee, { new: true });
    
            if (!updatedEmployee) {
                return res.status(404).json({
                    success: false,
                    message: 'Employee not found',
                    data: {}
                });
            }
    
            res.status(200).json({
                success: true,
                message: 'Edit successfully!',
                data: updatedEmployee
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                data: {}
            });
        }
    },  
    
    deleteEmployee: async (req, res) => {
        try {
            await Employee.deleteOne({_id: req.params.id})
            res.status(200).json({
                success: true,
                message: 'Delete successfully!',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                data: {}
            });
        }
    },  
    
}

module.exports = employeeController;
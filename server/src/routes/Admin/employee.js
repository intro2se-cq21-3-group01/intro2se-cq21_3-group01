const EmployeeController = require("../../controllers/Admin/employeeController");
const LoginEmployee = require("../../controllers/Admin/loginEmployee")
const authMiddleware = require("../../middleware/AdminMiddleware")
const router = require("express").Router();


// GET ALL EMPLOYEES
router.get("/",authMiddleware.verifyTokenAndAdminAuth, EmployeeController.getAllEmployee);

// ALL EMPLOYEES
router.post("/add",authMiddleware.verifyTokenAndAdminAuth, EmployeeController.addEmployee);

// EDIT EMPLOYEES
router.post("/update/:id",authMiddleware.verifyTokenAndAdminAuth, EmployeeController.editEmployee);

// DELETE EMPLOYEES
router.get("/delete/:id",authMiddleware.verifyTokenAndAdminAuth, EmployeeController.deleteEmployee);

// GET EMPLOYEE BY ID
router.get("/:id",authMiddleware.verifyTokenAndAdminAuth, EmployeeController.getEmployeeById);

// LOGIN EMPLOYEE 
router.post("/login", LoginEmployee.loginUser);

module.exports = router;
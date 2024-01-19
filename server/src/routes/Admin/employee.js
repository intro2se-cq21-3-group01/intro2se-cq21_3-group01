const EmployeeController = require("../../controllers/Admin/employeeController");
const LoginEmployee = require("../../controllers/Admin/loginEmployee")
const router = require("express").Router();


// GET ALL EMPLOYEES
router.get("/", EmployeeController.getAllEmployee);

// ALL EMPLOYEES
router.post("/add", EmployeeController.addEmployee);

// EDIT EMPLOYEES
router.post("/update/:id", EmployeeController.editEmployee);

// DELETE EMPLOYEES
router.get("/delete/:id", EmployeeController.deleteEmployee);

// GET EMPLOYEE BY ID
router.get("/:id", EmployeeController.getEmployeeById);

// LOGIN EMPLOYEE 
router.post("/login", LoginEmployee.loginUser);

module.exports = router;
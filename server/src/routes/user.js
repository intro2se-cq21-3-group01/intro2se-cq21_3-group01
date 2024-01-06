const router = require("express").Router();

const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// GET USER BY ID
router.get("/", userController.getUserById);

router.post("/edit", userController.editUser);

module.exports = router;
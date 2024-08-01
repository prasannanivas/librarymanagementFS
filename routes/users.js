const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController"); // Ensure this path is correct
const auth = require("../middleware/auth");

router.post("/register", UserController.register); // Ensure UserController.register is defined
router.post("/login", UserController.login); // Ensure UserController.login is defined
router.get("/profile", auth, UserController.getProfile); // Ensure UserController.getProfile is defined
router.put("/profile", auth, UserController.updateProfile); // Ensure UserController.updateProfile is defined
router.get("/", auth, UserController.getAllUsers); // Ensure UserController.getAllUsers is defined
router.put("/:id/role", auth, UserController.updateUserRole); // Ensure UserController.updateUserRole is defined
router.put("/:id", auth, UserController.editUser);

module.exports = router;

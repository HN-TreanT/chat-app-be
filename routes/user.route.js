const router = require("express").Router();
const userController = require("../controller/users.controller");
router.get("/", userController.getAll);
router.put("/:_id", userController.editUser);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/:email", userController.getUserById);
router.get("/getfriend/listFriend", userController.getListFriend);
module.exports = router;

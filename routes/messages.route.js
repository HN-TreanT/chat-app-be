const router = require("express").Router();
const messagesController = require("../controller/messages.controller");
router.get("/", messagesController.getMessages);

module.exports = router;

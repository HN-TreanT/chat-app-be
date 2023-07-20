const router = require("express").Router();

const userRoute = require("./user.route");
const requestRoute = require("./request.route");
const messageRoute = require("./messages.route");
const authRoute = require("./auth.route");

router.use("/api/user", userRoute);
router.use("/api/request", requestRoute);
router.use("/api/messages", messageRoute);
router.use("/api/auth", authRoute);

module.exports = router;

const router = require("express").Router();
const friendRequest = require("../controller/friendRequest");
router.get("/", friendRequest.getFriendRequest);
router.post("/create", friendRequest.createRequest);
router.delete("/delete", friendRequest.deleteRequest);

module.exports = router;

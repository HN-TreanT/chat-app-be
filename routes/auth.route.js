const router = require("express").Router();
const {
  responseSuccessWithData,
  responseInValid,
  responseServerError,
} = require("../helper/ResponseRequests");
const User = require("../models/users");
const passport = require("passport");
require("dotenv").config();

///route google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  (req, res, next) => {
    passport.authenticate("google", (err, profile) => {
      req.user = profile;
      next();
    })(req, res, next);
  },
  (req, res) => {
    res.redirect(
      `${process.env.URL_CLIENT}/login-gg-fb/${req.user.emails[0].value}/${req.user.tokenLogin}`
    );
  }
);

//route facebook

router.get("/facebook", passport.authenticate("facebook", { session: false }));

router.get(
  "/facebook/callback",
  (req, res, next) => {
    passport.authenticate("facebook", (err, profile) => {
      req.user = profile;
      next();
    })(req, res, next);
  },
  (req, res) => {
    res.redirect(
      `${process.env.URL_CLIENT}/login-gg-fb/${req.user.id}@gmail.com/${req.user.tokenLogin}`
    );
  }
);

router.post("/login-gg-fb", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return responseInValid({ res, message: "not found user" });
    }
    if (user.password === req.body.tokenLogin) {
      return responseSuccessWithData({ res, data: user });
    } else {
      return responseInValid({ res, message: "login fail" });
    }
  } catch (err) {
    return responseServerError({ res, err: err.message });
  }
});

module.exports = router;

var GoogleStrategy = require("passport-google-oauth20").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;
const User = require("./models/users");
require("dotenv").config();
const passport = require("passport");
const { v4: uuidv4 } = require("uuid");
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        if (profile) {
          const tokenLogin = uuidv4();
          profile.tokenLogin = tokenLogin;
          const user = await User.findOne({ email: profile.emails[0].value });
          if (!user) {
            User.create({
              email: profile.emails[0].value,
              username: profile.emails[0].value,
              displayName: profile.displayName,
              avatarImage: profile.photos[0].value,
              password: tokenLogin,
            });
          } else {
            user.password = tokenLogin;
            await user.save();
          }
        }
      } catch (error) {
        console.log(error);
      }
      // console.log(profile);
      return cb(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/api/auth/facebook/callback",
      profileFields: ["emails", "photos", "id", "displayName"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        if (profile) {
          const tokenLogin = uuidv4();
          profile.tokenLogin = tokenLogin;
          const user = await User.findOne({ username: profile.id });
          if (!user) {
            User.create({
              email: `${profile.id}@gmail.com`,
              username: profile.id,
              displayName: profile.displayName,
              avatarImage: profile.photos[0].value,
              password: tokenLogin,
            });
          } else {
            user.password = tokenLogin;
            await user.save();
          }
        }
      } catch (err) {
        console.log(err);
      }
      return cb(null, profile);
    }
  )
);

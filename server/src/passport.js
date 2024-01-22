const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')
require('dotenv').config();
const db = require('./models/User1');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/api/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    
      const user = await db.findById({ _id: profile.id })
      if(user === null && profile?.id) {
          const newUser = await new db({
            idGoogle: profile.id,
            username: profile.displayName,
            email: profile.emails[0]?.value,
        });
        await newUser.save();
      }
    //User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(null, profile);
    //});
  }
));
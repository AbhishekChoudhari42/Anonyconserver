const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
 

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope : ["profile","email"]
      },
  
      function (accessToken, refreshToken, profile, callback) {
        User.findOrCreate(
          {
            googleId: profile.id,
            userName: profile.displayName,
          },
          function (err, user) {
            return callback(err, user);
          }
        );
      }
    )
  );

  // Serialize and Deserialize User

// used to serialize the user for the session
passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
  
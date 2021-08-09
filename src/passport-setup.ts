import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const GOOGLE_CLIENT_ID = '297017348247-5e63rr1md7bfm31v1mejjvrc1m8nbprm.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'yFfsDepeBTAqB7n1RNRBOGva';
const CALLBACK_URL = 'http://localhost:5000/auth/google/callback';

// Strategy -> Serializer
// Request to google-auth -> Deserializer

// Choose data
passport.serializeUser(function (user: any, done) {
  // We only should put id or Partial<User> into done func, to make cookie smaller
  done(null, user); // or put user.id
});

passport.deserializeUser(function (user: any, done) {
  // User.findById(id, function(err: any, user: any) {
  done(null, user);
  // });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      // use profile to find user in own db
      return done(null, profile); // err, user
    }
  )
);

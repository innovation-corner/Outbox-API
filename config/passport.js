const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const ExtractJWT = require("passport-jwt").ExtractJwt;
const JWTstrategy = require("passport-jwt").Strategy;
const jwtSecret = process.env.jwtSecret || "secret";

const User = require("../models/user");

const authenticate = (email, password, done) => {
  User.findOne({ where: { email }, include: [{ all: true }] })
    .then(user => {
      if (!user) {
        return done(null, false, {
          message: "Incorrect email."
        });
      } else if (!user.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      } else if (!user.isVerified) {
        return done(null, false, {
          message: "Unverified email"
        });
      }
      return done(null, user);
    })
    .catch(e => {
      console.error("error", e);
    });
};

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password"
  },
  (email, password, done) => {
    authenticate(email, password, done);
  }
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
};

passport.use(
  "jwt",
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      User.findOne({
        where: {
          id: jwt_payload.id
        }
      }).then(user => {
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    } catch (err) {
      done(err);
    }
  })
);

passport.use("local", localStrategy);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;

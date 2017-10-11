const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
// Create local strategy - to login or with email/password
// because we are using email instead of username for login we
// must tell LocalStrategy to look at the email field for the 'username'
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(
    email,
    password,
    done
) {
    // Verify email and password, call done with user
    // if Invalid call done with false
    User.findOne({ email: email }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        // compare passwords -> is 'password' == user.password
        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                return done(null, false);
            }
            if (!isMatch) {
                return done(null, false);
            }

            return done(null, user);
        });
    });
});

// Setup options for jwt strategy
// to confirm token returned from login or signup is valid
const jwtOptions = {
    // look at header.authorization for the token
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    // secret to decode token
    secretOrKey: config.secret
};

// Create JWT Strategy
// to confirm token returned from login or signup is valid
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    // payload = userId & timestamp from authentication res
    // See if user ID in payload exists in db
    // if true -> call done with that user
    // if false -> call done without a user
    User.findById(payload.sub, function(err, user) {
        // if err return error and on user
        if (err) {
            return done(err, false);
        }

        if (user) {
            // found user so return done no error with user
            done(null, user);
        } else {
            // user NOT found so return done no error with no user
            done(null, false);
        }
    });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);

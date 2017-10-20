const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    // See if user with given email exists
    User.findOne({ email: email }, (err, existingUser) => {
        if (!email || !password) {
            return res
                .status(422)
                .send({ error: 'You must provide an email and password' });
        }
        // If a user with email does exist, return an error
        if (err) {
            return next(err);
        }
        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use' });
        }
        // If email does NOT exist, create and save user record
        const user = new User({
            email: email,
            password: password
        });
        user.save(err => {
            if (err) {
                return next(err);
            }
            // Respond to request indicating the user was created
            res.json({ token: tokenForUser(user) });
        });
    });
};

exports.signin = function(req, res, next) {
    // User has already had their email and password auth'd
    // we just need to give them a token

    res.send({ token: tokenForUser(req.user) });
};

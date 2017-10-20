const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// Session false to prevent passport from creating a cookie based session
// we want a token based authorization
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSingin = passport.authenticate('local', { session: false });
module.exports = function(app) {
    app.get('/', requireAuth, function(req, res) {
        res.send({ hi: 'there' });
    });
    app.post('/signup', Authentication.signup);
    app.post('/signin', requireSingin, Authentication.signin);
};

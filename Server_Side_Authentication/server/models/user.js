const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});
// On Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function(next) {
    // context of function is the user model (this)
    let user = this;
    // generate a salt then run callback
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }
        // hash (encrypt) our password useing the salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) {
                return next(err);
            }
            // overwrite plaintext password with encrypted password
            user.password = hash;
            // next -> now you can save password
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            return callback(err);
        }

        callback(null, isMatch);
    });
};

const User = mongoose.model('user', userSchema);

module.exports = User;

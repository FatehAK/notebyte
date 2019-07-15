/* eslint-disable no-undef */

const mongoose = require('mongoose');

//schema defining the structure of the db
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    notes: [
        {
            title: String,
            content: String,
            date: String
        }
    ]
});

//using statics property(specific to mongoose) to define custom method
UserSchema.statics.authUser = function(username, password, callback) {
    //sending query to check if user is in db
    User.findOne({ username: username }, function(err, user) {
        if (err) {
            return callback(err);
        } else if (!user) {
            let userErr = new Error('No user found');
            userErr.status = 401;
            return callback(userErr);
        }

        if (password === user.password) {
            return callback(null, user);
        }
        return callback();
    });
};

//now we create the dababase
const User = mongoose.model('User', UserSchema);
module.exports = User;

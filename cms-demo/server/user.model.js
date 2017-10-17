var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdTime: {
        type: Number,
        default: Date.now()
    },
    updatedTime: {
        type: Number,
        default: Date.now()
    },
    loginTime: Number
}, {
    strict: false,
    versionKey: false
});

module.exports = mongoose.model('cms_users', UserSchema);;


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    nickname: String,
    password: String,
    createTime: {
        type: Number,
        default: Date.now()
    },
    updatedTime: Number
})

const userModel = mongoose.model('sys_users', UserSchema);

module.exports = userModel;

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BlogPost = new Schema({
    title: String,
    content: String,
    createdTime: Number
});

var BlogModel = mongoose.model('cms_articles', BlogPost);

module.exports = BlogModel;

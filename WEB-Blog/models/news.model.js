
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const News = new Schema({
    title: String,
    content: String,
    createdTime: Number
});

var NewsModel = mongoose.model('blog_news', News);

module.exports = NewsModel;
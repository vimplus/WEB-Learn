var register = require('babel-register');

register({
    presets: ['es2015']
});
require('babel-polyfill');
require('./app.js');

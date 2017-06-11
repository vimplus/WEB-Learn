const Koa = require("koa");
const KoaRouter = require("koa-router");
const co = require("co");
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const app = new Koa();
const router = new KoaRouter();

const port = process.env.PORT || 8088;

// Connection URL
var url = 'mongodb://127.0.0.1:27017/txboy';

app.use(router.routes()).use(router.allowedMethods());

router.get('/', function (ctx, next) {
    console.log('------------ctx:', ctx)
    ctx.body = "这是首页!";
})

router.get('/api/user/getInfo', co.wrap(function* (ctx, next) {
    var params = ctx.query;
    console.log('-------params:', params)
    var name = params.name;
    var db = yield MongoClient.connect(url);
    var users = db.collection('users');
    var doc = yield users.findOne({name: name});
    db.close();
    console.log('-----------docA:', doc)
    ctx.body = {
        code: 10000,
        data: doc,
        status: "success",
        msg: "请求成功!"
    }
}))

router.get('/api/user/register', co.wrap(function* (ctx, next) {
    var params = ctx.query;
    console.log('-------params:', params)

    var db = yield MongoClient.connect(url);
    var users = db.collection('users');
    yield users.insert(params);

    db.close();

    ctx.body = {
        code: 10000,
        data: null,
        status: "success",
        msg: "保存成功!"
    }
}))

router.get('/api/user/delete', co.wrap(function* (ctx, next) {
    var params = ctx.query;
    console.log('-------params:', params)
    var name = params.name;

    var db = yield MongoClient.connect(url);
    var users = db.collection('users');
    var result = yield users.deleteOne({name: name});

    db.close();

    ctx.body = {
        code: 10000,
        data: result,
        status: "success",
        msg: "删除成功!"
    }
}))

router.get('/api/user/edit', co.wrap(function* (ctx, next) {
    var params = ctx.query;
    console.log('-------params:', params)
    var name = params.name;

    var db = yield MongoClient.connect(url);
    var users = db.collection('users');
    var result = yield users.updateOne({name: name}, {$set: params});

    db.close();

    ctx.body = {
        code: 10000,
        data: result,
        status: "success",
        msg: "修改成功!"
    }
}))

app.listen(port, () => {
    console.log('Start Koa server on ', port)
})

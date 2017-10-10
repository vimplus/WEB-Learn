var Koa = require('koa');
var KoaRouter = require('koa-router');
var staticServer = require('koa-static');
var koaBody = require('koa-body');
var path = require('path');
var co = require('co');

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/cms-demo');

var articleModel = require('./article.model');


var app = new Koa();
var router = new KoaRouter();

app.use(staticServer(path.resolve(__dirname, '../views')));

app
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods());


router.get('/', (ctx, next) => {
    ctx.body = 'This a index page.';
})

router.post('/api/article/save', co.wrap(function* (ctx, next) {
    // var params = ctx.query;
    var params = ctx.request.body;
    console.log('-------------params:', params)
    var doc = yield articleModel.create(params);
    console.log('-------doc:', doc)
    ctx.body = {
        code: 10000,
        data: doc,
        msg: "保存成功!"
    }
}))

router.get('/api/article/getList', co.wrap(function* (ctx, next) {
    var params = ctx.query;
    var docs =yield articleModel.find({});
    ctx.body = {
        code: 10000,
        data: {
            list: docs
        },
        msg: "获取成功!"
    }
}))

app.listen(8080, () => {
    console.log('-----恭喜你后端Node服务启动成功！运行在8080端口-----')
})

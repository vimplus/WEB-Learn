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

router.get('/api/article/delete', co.wrap(function* (ctx, next) {
    var params = ctx.query;
    var id = params.id;
    var ret =yield articleModel.remove({_id: id});
    console.log('-------ret:', ret)
    if (ret && ret.result.n == 1) {
        ctx.body = {
            code: 10000,
            data: ret.result,
            msg: "删除成功!"
        }
    } else {
        ctx.body = {
            code: 99999,
            data: null,
            msg: "删除失败!"
        }
    }

}))

router.get('/api/article/findById', co.wrap(function* (ctx, next) {
    var params = ctx.query;
    var id = params.id;
    var doc = yield articleModel.findOne({_id: id});
    console.log('-------doc:', doc)
    if (doc) {
        ctx.body = {
            code: 10000,
            data: doc,
            msg: "请求成功!"
        }
    } else {
        ctx.body = {
            code: 99999,
            data: null,
            msg: "获取失败!"
        }
    }

}))

router.post('/api/article/edit', co.wrap(function* (ctx, next) {
    var params = ctx.request.body;
    var id = params.id;
    console.log('------id:', id)
    var ret = yield articleModel.update({_id: id}, { $set:{title: params.title, content: params.content} });
    console.log('-------ret:', ret)
    if (ret && ret.n == 1) {
        ctx.body = {
            code: 10000,
            data: ret,
            msg: "修改成功!"
        }
    } else {
        ctx.body = {
            code: 99999,
            data: null,
            msg: "修改失败!"
        }
    }

}))

app.listen(8080, () => {
    console.log('-----恭喜你后端Node服务启动成功！运行在8080端口-----')
})

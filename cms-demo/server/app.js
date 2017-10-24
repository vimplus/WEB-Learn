var Koa = require('koa');
var KoaRouter = require('koa-router');
var staticServer = require('koa-static');
var koaBody = require('koa-body');
var path = require('path');
var co = require('co');

var jwt = require('jsonwebtoken');

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/cms-demo');

var articleModel = require('./article.model');
var UserModel = require('./user.model');
var fileService = require('./fileService');


var app = new Koa();
var router = new KoaRouter();

app.use(staticServer(path.resolve(__dirname, '../views')));

app
  .use(koaBody({multipart: true}))
  .use(router.routes())
  .use(router.allowedMethods());


router.get('/', (ctx, next) => {
    ctx.body = 'This a index page.';
})

router.post('/api/article/save', co.wrap(function* (ctx, next) {
    // var params = ctx.query;
    var params = ctx.request.body;
    var token = ctx.cookies.get('token');
    console.log('-------------token：', token)
    try {
        var decoded = jwt.verify(token, '51rgb');
        console.log('-------------decoded:', decoded)
        console.log('-------------params:', params)
        var doc = yield articleModel.create(params);
        console.log('-------doc:', doc)
        ctx.body = {
            code: 10000,
            data: doc,
            msg: "保存成功!"
        }
    } catch (err) {
        console.log('-------------err:', err)
        if (err && err.message) {
            switch (err.message) {
                case 'invalid token':
                    ctx.body = {
                        code: 99999,
                        data: null,
                        msg: "非法访问!"
                    }
                    break;
                case 'jwt expired':
                    ctx.body = {
                        code: 99999,
                        data: null,
                        msg: "未登录或登录过期，请重新登录!"
                    }
                    break;
                default:
                    ctx.body = {
                        code: 99999,
                        data: null,
                        msg: "System Error!"
                    }
            }
        } else {
            ctx.body = {
                code: 99999,
                data: null,
                msg: "System Error!"
            }
        }
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

router.post('/api/user/register', co.wrap(function* (ctx, next) {
    var params = ctx.request.body;
    var username = params.username;
    var userInfo = yield UserModel.findOne({username: username});
    if (userInfo) {
        ctx.body = {
            code: 10001,
            data: null,
            msg: "该用户名已存在，请重新输入!"
        }
        return;
    }
    var doc = yield UserModel.create(params);
    console.log('-------doc:', doc)
    if (doc) {
        ctx.body = {
            code: 10000,
            data: doc,
            msg: "注册成功!"
        }
    } else {
        ctx.body = {
            code: 99999,
            data: null,
            msg: "注册失败!"
        }
    }

}))



router.post('/api/user/login', co.wrap(function* (ctx, next) {
    var params = ctx.request.body;
    var username = params.username;
    var password = params.password;
    var userInfo = yield UserModel.findOne({username: username});
    if (userInfo) {
        if (password != userInfo.password) {
            ctx.body = {
                code: 10002,
                data: null,
                msg: "密码错误，请重新输入!"
            }
        } else {
            var tokenInfo = {
                uid: userInfo._id,
                username: userInfo.username,
                email: userInfo.email,
            }
            var token = jwt.sign(tokenInfo, '51rgb', {expiresIn: 60 * 1});
            console.log('-----token:', token)
            ctx.cookies.set('token', token)
            ctx.body = {
                code: 10000,
                data: tokenInfo,
                msg: "登录成功!"
            }
        }
    } else {
        ctx.body = {
            code: 10003,
            data: null,
            msg: "该用户不存在，请检查!"
        }
    }

}))


router.post('/api/file/upload', co.wrap(function* (ctx, next) {
    var content = ctx.request.body;
    console.log('------------content:', content)
    if (content && content.files.img) {
        console.log('------------fileService:', fileService)
        var res = yield fileService.upload(content.files.img);
        if (res) {
            ctx.body = {
                code: 10000,
                data: res,
                msg: "上传成功!"
            }
        } else {
            ctx.body = {
                code: 99999,
                data: null,
                msg: "上传失败!"
            }
        }
    }

}))

app.listen(8080, () => {
    console.log('-----恭喜你后端Node服务启动成功！运行在8080端口-----')
})

const Koa = require('koa');
const mongoose = require('mongoose');
const Router = require('koa-router');
const koaStatic = require('koa-static');
const koaBody = require('koa-body');
const path = require('path');
const jwt = require('jsonwebtoken');

const user = require('./models/user');

const app = new Koa();
const router = new Router();

const port = 8080;

mongoose.connect('mongodb://127.0.0.1/nodeapp');

app.use(koaBody());
app.use(router.routes()).use(router.allowedMethods());
app.use(koaStatic(path.join(__dirname, '/views')))

router.get('/api/demo', (ctx, next) => {
    const payload = ctx.query;

    ctx.body = {
        code: 10000,
        msg: ' 请求成功！',
        data: {
            name: '大川'
        }
    }
})

router.post('/api/user/register', async (ctx, next) => {
    const payload = ctx.request.body;

    const obj = {
        username: payload.username,
        nickname: payload.nickname,
        password: payload.password,
        updatedTime: Date.now()
    }

    const doc = await user.create(obj);
    
    ctx.body = {
        code: 10000,
        data: doc,
        msg: '注册成功！'
    }
})

router.post('/api/user/login', async (ctx, next) => {
    const payload = ctx.request.body;

    const username = payload.username;
    const password = payload.password;

    const doc = await user.findOne({username: username});

    if (doc && doc.password === password) {
        const data = {
            username: doc.username,
            nickname: doc.nickname
        }

        const token = jwt.sign(data, 'nodekey');

        data.token = token;

        ctx.body = {
            code: 10000,
            data: data,
            msg: '登录成功！'
        }
    } else {
        ctx.body = {
            code: 99999,
            msg: '用户名或密码错误！'
        }
    }
    
})

// app.use((ctx, next) => {
//     ctx.body = 'Hello, Koa.';
// })

app.listen(port, () => {
    console.log('The app already at port ', port);
});




const Koa =  require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const staticServer = require('koa-static');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/weblog');

const app = new Koa();
const router = new Router();
const port = 8080;


const News = require('./models/news.model');

// 使用koa-router
app.use(koaBody());
app.use(router.routes()).use(router.allowedMethods());
// 托管静态文件
app.use(staticServer(__dirname + '/views'));

// 配置路由
router.get('/api/getList', (ctx, next) => {
    ctx.body = {
        code: 10000,
        data: [
            {name: 'mc', sex: 1},
            {name: '无痕', sex: 1},
            {name: '周宜', sex: 2}
        ],
        msg: '请求成功！'
    }
});

router.post('/api/news/save', async (ctx, next) => {
    const payload = ctx.request.body;
    const data = {
        title: payload.title,
        content: payload.content,
        author: payload.author,
        createdTime: Date.now()
    }
    const res = await News.create(data);
    if (!res) {
        ctx.body = {code: 99999, msg: '保存失败！'};
        return;
    }

    ctx.body = {
        code: 10000,
        data: res,
        msg: '保存成功！'
    }
    // debugger
});


router.get('/api/article/list', async (ctx, next) => {
    const list = await News.find({});

    ctx.body = {
        code: 10000,
        data: {
            list: list || []
        },
        msg: '请求成功！'
    }
});

router.get('/api/article/get', async (ctx, next) => {
    const params = ctx.query;
    console.log(params);

    const doc = await News.findOne({
        _id: params.id
    });

    ctx.body = {
        code: 10000,
        data: doc,
        msg: '请求成功！'
    }
});

// 监听服务端口
app.listen(port, () => {
    console.log('The app start at port:', port);
})

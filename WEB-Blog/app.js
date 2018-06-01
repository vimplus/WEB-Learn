
const Koa =  require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const fs = require('fs');
const path = require('path');
const staticServer = require('koa-static');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/weblog');

const app = new Koa();
const router = new Router();
const port = 8080;


const News = require('./models/news.model');

// 使用koa-router
app.use(koaBody({ multipart: true }));
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
        img: payload.img,
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
    const payload = ctx.query;
    console.log('-------payload: ', payload);
    const keyword = payload.value;
    console.log('-------keyword:', keyword);
    const cond = {};
    if (keyword) {
        cond.title = new RegExp(keyword, 'i');
    }

    const list = await News.find(cond);

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

router.del('/api/article/:id', async (ctx, next) => {
    const params = ctx.params;
    console.log(params);

    const result = await News.deleteOne({
        _id: params.id
    });

    if (result && result.n === 1) {
        ctx.body = {
            code: 10000,
            data: result,
            msg: '删除成功！'
        }
    } else {
        ctx.body = {
            code: 99999,
            data: null,
            msg: '删除失败！'
        }
    }
});

router.post('/api/news/edit', async (ctx, next) => {
    const payload = ctx.request.body;
    const id = payload.id;

    const result = await News.findOneAndUpdate({ _id: id }, payload, { new: true });

    if (!result) {
        ctx.body = {code: 99999, msg: '修改失败！'};
        return;
    }

    ctx.body = {
        code: 10000,
        data: result,
        msg: '修改成功！'
    }
    // debugger
});

router.post('/api/files/upload', async (ctx, next) => {
    const payload = ctx.request.body;
    
    const img = payload.files.img;
    const readForm = fs.createReadStream(img.path);
    const savePath = path.join('/upload/', img.name);
    const saveDir = path.join('./views/', savePath);
    console.log('-------savePath:', savePath);
    console.log('-------saveDir:', saveDir);

    const fileStream = fs.createWriteStream(saveDir);
    console.log('-------fileStream:', fileStream);

    readForm.pipe(fileStream);
    readForm.on('end' , function (ret) {
        console.log(ret);
    })

    ctx.body = {
        code: 10000,
        data: {
            fileUrl: savePath
        },
        msg: '上传成功！'
    }
});

// 监听服务端口
app.listen(port, () => {
    console.log('The app start at port:', port);
})

const Koa = require('koa');
const KoaRouter = require('koa-router');
const koaBody = require('koa-body');
const staticServer = require('koa-static');

const mongoose = require('mongoose');

const app = new Koa();
const router = new KoaRouter();

mongoose.connect('mongodb://127.0.0.1:27017/rgbweb');


const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
  author: String,
  title: String,
  body: String,
  date: Number
});

const UserSchema = new Schema({
    username: String,
    password: String
});


const ArticleModel = mongoose.model('sys_articles', ArticleSchema);
const UserModel = mongoose.model('sys_users', UserSchema);

// app.use(ctx => {
//     ctx.body = '<h1>hello</h1>';
// });

app.use(koaBody());
app.use(router.routes()).use(router.allowedMethods());

console.log('__dirname:', __dirname);
app.use(staticServer(__dirname + '/views'));

// router.get('/', (ctx, next) => {
//     ctx.body = '<h1>hello world.</h1>';
// });

router.get('/page/content', (ctx, next) => {
    const params = ctx.query;
    console.log('------ctx：', ctx)
    console.log('------ctx.query：', ctx.query)
    console.log('------这是前端传过来的参数：', params)
    if (params.age >= 18) {
        ctx.body = {
            msg: `${params.name}同学，你已经成年了！`
        };
    } else {
        ctx.body = {
            msg: `${params.name}同学，你还是未成年！`
        };
    }
});

router.get('/api/article/add', async (ctx, next) => {
    const params = ctx.query;
    const doc = await ArticleModel.create(params);

    ctx.body = {
        data: doc
    };
});

router.post('/api/user/register', async (ctx, next) => {
    const params = ctx.request.body;
    console.log('------params:', params);
    const doc = await UserModel.create(params);

    if (doc) {
        ctx.body = {
            code: 10000,
            data: doc,
            msg: '注册成功！'
        };
    } else {
        ctx.body = {
            code: 99999,
            data: null,
            msg: '注册失败！'
        };
    }
});

router.post('/api/getList', (ctx, next) => {
    ctx.body = {
        list: ['mishi', 'mc2']
    };
});
  
app.listen(3000, () => {
    console.log('Start App on 3000.');
});



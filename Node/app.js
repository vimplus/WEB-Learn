const Koa = require('koa');
const KoaRouter = require('koa-router');

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


const ArticleModel = mongoose.model('sys_article', ArticleSchema);

// app.use(ctx => {
//     ctx.body = '<h1>hello</h1>';
// });

app.use(router.routes()).use(router.allowedMethods());

router.get('/', (ctx, next) => {
    ctx.body = '<h1>hello world.</h1>';
});

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

router.post('/api/getList', (ctx, next) => {
    ctx.body = {
        list: ['mishi', 'mc2']
    };
});
  
app.listen(3000, () => {
    console.log('Start App on 3000.');
});



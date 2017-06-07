const Koa = require("koa");
const KoaRouter = require("koa-router");
const app = new Koa();
const router = new KoaRouter();

const port = process.env.PORT || 8088;


app.use(router.routes()).use(router.allowedMethods());

router.get('/', function (ctx, next) {
    console.log('------------ctx:', ctx)
    ctx.body = "这是首页!";
})

router.get('/api/user/getInfo', function (ctx, next) {
    var params = ctx.query;
    console.log('-------params:', params)
    ctx.body = {
        code: 10000,
        data: {
            name: "txboy",
            city: "深圳"
        },
        status: "success",
        msg: "请求成功!"
    }
})

router.post('/api/save', function (ctx, next) {
    var data = ctx.req.body;
    console.log('-------data:', data)
    ctx.body = {
        code: 10000,
        data: null,
        status: "success",
        msg: "保存成功!"
    }
})

app.listen(port, () => {
    console.log('Start Koa server on ', port)
})

const Koa =  require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
const port = 8080;

app.use(router.routes()).use(router.allowedMethods());

// 配置路由
router.get('/', (ctx, next) => {
    ctx.body = 'The server already start.';
});


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


// 监听服务端口
app.listen(port, () => {
    console.log('The app start at port:', port);
})
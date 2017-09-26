var Koa = require('koa');
var KoaRouter = require('koa-router');

var app = new Koa();
var router = new KoaRouter();

app
  .use(router.routes())
  .use(router.allowedMethods());

router.get('/', (ctx, next) => {
    ctx.body = 'This a index page.';
})

app.listen(8080, () => {
    console.log('-----恭喜你后端Node服务启动成功！运行在8080端口-----')
})

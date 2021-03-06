const Koa = require('koa');
const KoaRouter = require('koa-router');
const koaBody = require('koa-body');
const staticServer = require('koa-static');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

const app = new Koa();
const router = new KoaRouter();

mongoose.connect('mongodb://127.0.0.1:27017/rgbweb');

const key = '51RGB';


const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
  author: String,
  title: String,
  body: String,
  date: Number
});

const UserSchema = new Schema({
    username: String,
    password: String,
    age: Number
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

router.get('/page/content', verifyToken, (ctx, next) => {
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

router.get('/api/article/add', verifyToken, async (ctx, next) => {
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


router.post('/api/user/login', async (ctx, next) => {
    const params = ctx.request.body;
    console.log('------params:', params);
    const userInfo = await UserModel.findOne({
        username: params.username
    });
    if (userInfo && userInfo.password === params.password) {

        const token = jwt.sign({ username: userInfo.username }, key);
        ctx.body = {
            code: 10000,
            data: {
                username: userInfo.username,
                token: token
            },
            msg: '登录成功！'
        };
    } else {
        ctx.body = {
            code: 80001,
            data: null,
            msg: '用户名或密码错误！'
        };
    }
});

async function verifyToken(ctx, next) {
    const token = ctx.cookies.get('token');
    console.log('----------token:', token)

    try {
        var decoded = jwt.verify(token, key);
        console.log('---------decoded:', decoded)

        await next();

    } catch (error) {
        console.log('----------error msg:', error.message)
        switch (error.message) {
            case 'invalid token':
                ctx.body = {
                    code: 88888,
                    data: null,
                    msg: 'invalid token! 请检查token！'
                };
                break;
        
            default:

                break;
        }
    }
}

router.get('/api/user/getList', verifyToken, async (ctx, next) => {

    const params = ctx.query;
    const page = params.page && Number(params.page) || 1;
    const size = params.size && Number(params.size) || 10;

    // const userList = await UserModel.find({}, null, {
    //     skip: (page * size) - size,
    //     limit: size
    // });

    const userList = await UserModel.find({}).skip((page * size) - size).limit(size);
    // console.log('---------userList:', userList);

    if (userList && userList.length > 0) {
        const list = userList.map(item => {
            return {
                id: item._id,
                username: item.username
            }
        });
        ctx.body = {
            code: 10000,
            data: {
                list: list
            },
            msg: '请求成功！'
        };
    } else {
        ctx.body = {
            code: 99999,
            data: null,
            msg: '请求错误！'
        };
    }
    
});


router.post('/api/user/delete', async (ctx, next) => {
    const params = ctx.request.body;
    const userId = params.userId;
    const ret = await UserModel.findOneAndDelete({ _id: userId });
    console.log('-------ret:', ret);
    if (ret) {
        ctx.body = {
            code: 10000,
            data: null,
            msg: '删除成功！'
        };
    } else {
        ctx.body = {
            code: 99999,
            data: null,
            msg: '请求错误！'
        };
    }
});

router.get('/api/user/userInfo', verifyToken, async (ctx, next) => {

    const params = ctx.query;
    const userId = params.userId;

    const userInfo = await UserModel.findOne({_id: userId });
    // console.log('---------userList:', userList);
    const resData = {
        id: userInfo._id,
        username: userInfo.username,
        age: userInfo.age
    }

    if (userInfo) {
        ctx.body = {
            code: 10000,
            data: resData,
            msg: '请求成功！'
        };
    } else {
        ctx.body = {
            code: 99999,
            data: null,
            msg: '请求错误！'
        };
    }
    
});

router.post('/api/user/updateInfo', async (ctx, next) => {
    const params = ctx.request.body;
    const userId = params.userId;
    const age = params.age;
    console.log('------age:', age)

    const ret = await UserModel.findOneAndUpdate({ _id: userId }, {
        age: age
    }, { new: true });
    console.log('-------update ret:', ret);
    if (ret) {
        ctx.body = {
            code: 10000,
            data: null,
            msg: '修改成功！'
        };
    } else {
        ctx.body = {
            code: 99999,
            data: null,
            msg: '请求错误！'
        };
    }
});
  
app.listen(3000, () => {
    console.log('Start App on 3000.');
});



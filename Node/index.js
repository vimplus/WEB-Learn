const http = require('http');

const app = http.createServer(function (req, res) {
    console.log('-----Hello, 前端请求我们的服务啦-----');
    
    // 发送 HTTP 头部；
    // http 状态码 200；
    // 内容类型： text/plain

    res.writeHead(200, {'Content-Type': 'text/html'});

    // 发送响应内容 Hello World;
    res.end('------Hello, World.----------');
});

app.listen(8080, function () {
    console.log('Start App on 8080.');
});



var http = require('http');


var app = http.createServer(function (request, response) {
    console.log('---------Hello World！')
    // 发送 HTTP 头部
	// HTTP 状态值: 200 : OK
	// 内容类型: text/plain
	response.writeHead(200, {'Content-Type': 'text/html'});

	// 发送响应数据 "Hello World"
	response.end('-----Hello World---------\n');
})

app.listen(8080, function () {
    console.log('Start App on 8080.')
})

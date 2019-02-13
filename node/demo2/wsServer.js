// 使用nodejs-websocket库创建websocket服务
const ws = require('nodejs-websocket');

const POST = 3000;
const server = ws.createServer((cn) => {
    console.log('New Connection');
    cn.on('text', (str) => {
        console.log('Received ' + str);
        cn.sendText(str);
    })
    cn.on('close', (code, reason) => {
        console.log('Connection closed');
    })
    cn.on('error', (err) => {
        console.log('err handler');
        console.dir(err);
    })
})

server.listen(POST);
console.log('server is listening the port ' + POST);
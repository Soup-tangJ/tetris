const ws = require('nodejs-websocket');

const POST = 3000;
let clientCouter = 0;
const server = ws.createServer((cn) => {
    console.log('New Connection');
    clientCouter ++;
    let mse = {};
    mse.nickname = 'user' + clientCouter;
    mse.type = 'enter';
    mse.msg = mse.nickname + ' comes in';

    broadcast(mse);
    // 接收到消息的时候
    cn.on('text', (str) => {
        console.log('Received ' + str);
        mse.type = 'message';
        mse.msg = `${mse.nickname} says: ${str}`;
        broadcast(mse);
    })
    // 关闭连接的时候
    cn.on('close', (code, reason) => {
        console.log('Connection closed');
        mse.type = 'left';
        mse.msg = mse.nickname + ' left';
        broadcast(mse);
    })
    // 出错
    cn.on('error', (err) => {
        console.log('err handler');
        console.dir(err);
    })
})

server.listen(POST);

console.log('server is listening the port ' + POST);

function broadcast(mse) {
    server.connections.forEach( (connection) => {
        connection.sendText(JSON.stringify(mse));
    })
}
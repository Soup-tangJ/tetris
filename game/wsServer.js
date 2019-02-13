const app = require('http').createServer();
const io = require('socket.io')(app);

const PORT = 3000;

// 客户端连接数
let clientCount = 0;

// 用来存储客户端socket
const socketMap = {}

io.on('connection', (socket) => { // 客户端连接
    console.log('new connection');

    // 确定用户端，并将其存入map中
    socket.clientNum = ++clientCount;
    socketMap[clientCount] = socket;

    if(clientCount % 2 === 1){// 如果只有一名玩家，发送waiting消息
        socket.emit('waiting', '请等待另一名玩家');
    }else{// 两名玩家就发送start消息，开始游戏
        socket.emit('start');
        socketMap[clientCount - 1].emit('start');
    }

    // init
    socket.on('init', (data) => {
        if(socket.clientNum % 2 === 1){
            socketMap[socket.clientNum + 1].emit('init', data);
        }else{
            socketMap[socket.clientNum - 1].emit('init', data);
        }
    })
    
    socket.on('disconnect', () => { // 客户端断开

    })
})

app.listen(PORT);
console.log('This server is listening ' + PORT);
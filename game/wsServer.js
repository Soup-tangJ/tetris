const app = require('http').createServer();
const io = require('socket.io')(app);

const PORT = 8081;

// 客户端连接数
let clientCount = 0;

// 用来存储客户端socket
const socketMap = {}

// 操作事件
const eventArray = [ 'init', 'next', 'rotate', 'left', 'right', 'down', 'fall', 'fixed', 'score', 'intruder', 'time', 'bottomLine' ];

// 抽象
const bindListener = (socket, event) =>{
    socket.on(event, (data) => {
        if(socket.clientNum % 2 === 1){
            socketMap[socket.clientNum + 1] && socketMap[socket.clientNum + 1].emit(event, data);
        }else{
            socketMap[socket.clientNum - 1] && socketMap[socket.clientNum - 1].emit(event, data);
        }
    })
}

// 判定游戏胜负
const judgeGame = (pre, next) => { // 玩家按死亡先后顺序传入
    if(pre.score === next.score){ // 如果平局，则最后挂的人胜
        next.emit('over', true);
        pre.emit('over', false);
    }else{ // 否则谁分数大谁胜
        const preWin = pre.score > next.score; 
        pre.emit('over', preWin);
        next.emit('over', !preWin);
    }
    
}

// 当前房间广播
const broadcast = (socket, event, data) => {
    const anoterSocket = getOtherSocket(socket); event,
    socket.emit(event, data);
    anoterSocket && anoterSocket.emit(event, data);
}

// 获取房间内的另一位玩家
const getOtherSocket = (socket) => {
    if(socket.clientNum % 2 == 1){
        if((socket.clientNum + 1) in socketMap){
            return socketMap[socket.clientNum + 1];
        }
    }else{
        if((socket.clientNum - 1) in socketMap){
            return socketMap[socket.clientNum - 1];
        }
    }
    return null;
}

io.on('connection', (socket) => { // 客户端连接
    console.log('new connection');
    // 一些初始化
    socket.prepared = false;
    // 确定用户端，并将其存入map中
    socket.clientNum = ++clientCount;
    socketMap[clientCount] = socket;

    // 广播
    broadcast(socket, 'chat', {type: 'public', msg: '一个不愿意透露大名的玩家进入了房间。'})
    
    socket.on('chat', ({id, msg}) => {
        broadcast(socket, 'chat', {type: 'private', identity: id, msg});
    })
    
    

    if(clientCount % 2 === 1){// 如果只有一名玩家，发送waiting消息
        socket.emit('waiting', '请等待另一名玩家');
    }else{// 两名玩家就提示请准备
        if(socketMap[clientCount - 1]){
            socket.emit('waiting', '请准备…').emit('ready', true);
            socketMap[socket.clientNum - 1].emit('waiting', '请准备…').emit('ready', true);
            // 发送ready，前台显示准备按钮
        }else{ // 对方掉线了
            socket.emit('leave');
        }
    }

    // 转发事件
    eventArray.forEach(event => {
        bindListener(socket, event);
    })
    // 准备
    socket.on('prepared', () => {
        socket.prepared = true;
        socket.emit('waiting', '准备就绪');
        const anoterSocket = getOtherSocket(socket);

        if(anoterSocket.prepared && socket.prepared){
            broadcast(socket, 'chat', {type: 'public', msg: '双方准备就绪，游戏将在3秒后开始...'});
            setTimeout(() => {
                socket.emit('start');
                anoterSocket.emit('start');
            },2998);
        }
    })
    // 游戏结束
    socket.on('over', (score) => {
        // 先将玩家游戏成绩缓存
        socket.score = score;
        if(socket.clientNum % 2 === 1){ // 第一个玩家挂了
            const anoterSocket = socketMap[socket.clientNum + 1];
            if(!anoterSocket)return;
            if('score' in anoterSocket){
                judgeGame(anoterSocket, socket);
            }
        }else{ // 第二个玩家挂了
            const anoterSocket = socketMap[socket.clientNum - 1];
            if(!anoterSocket)return;
            if('score' in anoterSocket){
                judgeGame(anoterSocket, socket);
            }
        }
    })
    // 一方客户端断开
    socket.on('disconnect', () => {
        console.log('user disconnect');
        if(socket.clientNum % 2 === 1){
            socketMap[socket.clientNum + 1] && socketMap[socket.clientNum + 1].emit('leave');
        }else{
            socketMap[socket.clientNum - 1] && socketMap[socket.clientNum - 1].emit('leave');
        }
        delete (socketMap[socket.clientNum]);
    })
})

app.listen(PORT);
console.log('This server is listening ' + PORT);
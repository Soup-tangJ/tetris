const app = require('http').createServer();
const io = require('socket.io')(app); 

const PORT = 3000;
let clientCouter = 0;

app.listen(PORT);

io.on('connection', (socket) => {
    clientCouter ++;
    socket.nickname = 'user' + clientCouter;
    io.emit('enter', socket.nickname + ' comes in');
    socket.on('message', (data) => {
        io.emit('message', socket.nickname + ' says: ' + data);
    })
    socket.on('disconnect', () => {
        io.emit('leave', socket.nickname + ' left');
    })
})

console.log('server is listening the port ' + PORT);
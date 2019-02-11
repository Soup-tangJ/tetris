const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use('/', express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

// new user connction
io.on('connection', (socket) => {
    console.log('a user connected');

    // user disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })

    // chat
    socket.on('chat message', msg => {
        console.log('message ' + msg);
        io.emit('chat message', msg);
    })
    
})

http.listen(3000, () => {
    console.log('listening on *:3000');
})
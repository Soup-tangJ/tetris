// websocket
const socket = io('ws://localhost:3000');
const local = new Local(socket);
const remote = new Remote(socket);

socket.on('waiting', (msg) => { // waiting消息
    document.getElementById('waiting').innerHTML = msg;
})
// websocket
const socket = io('ws://localhost:8081');
const local = new Local(socket);
const remote = new Remote(socket);
const id = Date.now();

const makeChatMsg = ({type, msg, identity}) => {
    const word = document.createElement('li');
    
    if(type === 'public'){ // 广播消息
        word.className = type;
    }else{ // 玩家聊天
        if(identity === id){ // 是自己发的
            word.className = 'self';
        }else{
            word.className = 'other';
        }
    }
    word.innerHTML = msg;
    document.querySelector('#chat_list').appendChild(word);
}

socket.on('waiting', (msg) => { // waiting消息
        document.querySelector('#waiting').innerHTML = msg;
    }).on('chat', (data) => {
        makeChatMsg(data);
    }).on('ready', () => {
        document.querySelector('#ready').style.display = 'block';
    })
window.onload = function(){
    const chat_ipt = document.querySelector('#chat_ipt');
    const ready_btn = document.querySelector('#ready');

    chat_ipt.addEventListener('keydown', (event) => {
        event.stopPropagation();
        if(event.keyCode === 13){// 发送
            const msg = event.target.value;
            socket.emit('chat', {msg, id});
            event.target.value = '';
        }
    })
    ready_btn.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();
        socket.emit('prepared');
        event.target.style.display = 'none';
    })
    
}

const Remote = function(socket){
    // 游戏对象
    let game;
    // 分数
    let score = 0;
    // 事件
    const eventArray = [ 'rotate', 'left', 'right', 'down', 'fall', 'fixed', 'intruder' ];
    // ws服务器发送过来的指令
    const wsKeyEvent = () => {
        eventArray.forEach(item => {
            socket.on(item, (data) => {
                game[item](data);
            })
        })
        socket
            .on('init', ({type, dir}) => {
                start(type, dir);
            })
            .on('next', ({type, dir}) => {
                game.performNext(type, dir);
            })
            .on('score', (lineNum) => {
                for(let i=0; i<lineNum; i++){
                    game.checkClear();
                }
                score = game.addScore(lineNum, score);
            })
            .on('time', (time) => {
                game.setTime(time);
            })
    }
    // 开始
    const start = (type, dir) => {
        const doms = {
            gameDiv: document.getElementById('remote_game'),
            nextDiv: document.getElementById('remote_next'),
            timeDiv: document.getElementById('remote_time'),
            scoreDiv: document.getElementById('remote_score')
        }
        game = new Game();
        game.init(doms, type, dir);
    }
    
    
    // 开始
    wsKeyEvent();
    
}

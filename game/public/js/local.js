const Local = function(socket){
    // 游戏对象
    let game;
    // 常量
    const INTERVAL = document.getElementById('device').value === 'h5' ? 500 : 250;
    const divideSecond = 1000 / INTERVAL;
    // 时间
    let timeCounter = 0;
    // 时间定时器
    let time = 0;
    // 分数
    let score = 0;
    // 定时器
    let timer = null;
    // 键盘绑定事件
    const bindKeyEvent = () => {
        document.addEventListener('keydown', (event) => {
            if(game.isStop) return; // 如果是暂停状态，则不可进行操作

            switch(event.keyCode){
                case 37: // left
                case 65:
                    game.left();
                    socket.emit('left');
                    break;
                case 38: // up
                case 87:
                    game.rotate();
                    socket.emit('rotate');
                    break;
                case 39: // right
                case 68:
                    game.right();
                    socket.emit('right');
                    break;
                case 40: // down
                case 83:
                    game.down();
                    socket.emit('down');
                    break;
                case 32: // fall
                    game.fall();
                    socket.emit('fall');
                    break;
                default:
                    console.log(event.keyCode);
            }
        })
    }

    // h5按钮绑定事件
    const bindBtnEvent = () => {
        document.getElementById('up').addEventListener('click', game.rotate);
        document.getElementById('rotate').addEventListener('click', game.rotate);
        document.getElementById('left').addEventListener('click', game.left);
        document.getElementById('right').addEventListener('click', game.right);
        document.getElementById('down').addEventListener('click', game.down);
        document.getElementById('fall').addEventListener('click', game.fall);
    }

    // 随机生成一个方块种类的数字
    const generateType = () => Math.ceil(Math.random() * 7);

    // 随机生成一个方块的初始方向
    const generateDir = () => Math.ceil(Math.random() * 4) - 1;
    
    // 生成随机方块
    const generateBottomLines = (lineNum) => {
        const lines = [];
        for(let i=0; i<lineNum; i++){
            lines.push(getRandomLine());
        }
        return lines;
    }

    // 生成随机方块行
    const getRandomLine = () => {
        const { GAME_GRID_WIDTH } = game;
        const wrap = Array.from(new Array(GAME_GRID_WIDTH), () => 1);
        const whiteCount = Math.ceil(Math.random() * 3);

        for(let i=0; i<whiteCount; i++){
            wrap[Math.ceil(Math.random() * 10) - 1] = 0;
        }
        
        return wrap;
    }

    // requestAnimationFrame 的兼容性操作
    (() => {
        window.requestAnimFrame =   
            window.requestAnimationFrame        || 
            window.webkitRequestAnimationFrame  || 
            window.mozRequestAnimationFrame     || 
            window.oRequestAnimationFrame       || 
            window.msRequestAnimationFrame      || 
            function(callback){
                window.setTimeout(callback, 1000 / 60);
            };

        window.cancelAnimFrame  =  
            window.cancelAnimationFrame         ||
            window.webkitCancelAnimationFrame   ||
            window.mozCancelAnimationFrame      ||
            window.oCancelAnimationFrame        ||
            window.msCancelAnimationFrame       ||
            function (timeId) {
                window.clearInterval(timeId);
            }
    })()

    // 精确计时器函数
    const diySetInterval = (callback, interval) => {
        const { now } = Date;
        let startTime = now();
        let endTime = startTime;
        const loop = () => {
          timer = window.requestAnimFrame(loop);
          endTime = now();
          if (endTime - startTime >= interval) {
            startTime = endTime = now();
            callback(timer);
          }
        }
        timer = window.requestAnimFrame(loop);
    }

    // 界面时间更新函数
    const timeClock = () => {
        timeCounter ++;
        if(timeCounter === divideSecond){
            timeCounter = 0;
            time ++;
            game.setTime(time);
            socket.emit('time', time);
            if(time % 30 === 0){
                const intruderLine = generateBottomLines(1);
                game.intruder(intruderLine);
                socket.emit('intruder', intruderLine);
            }
        }
    }
    
    // 游戏进行逻辑
    const move = () => {
        timeClock();
        if(game.down()){
            socket.emit('down');
            return;
        }

        let lines = 0;
        game.fixed();
        socket.emit('fixed');
        while(game.checkClear()){
            ++lines;
        }
        if(lines){
            score = game.addScore(lines, score);
            socket.emit('score', lines);
            if(lines > 2){ // 如果消行大于两行，给对方增加lines - 2 行
                const bottomLines = generateBottomLines(lines - 2);
                socket.emit('bottomLine', bottomLines);
            }
        }
        if(game.checkGameOver()){
            // 结束游戏
            stop();
            document.getElementById('waiting').innerHTML = '等待对方游戏结果...';
            // 发送成绩给服务器判断胜负
            socket.emit('over', score);
        }else{
            const type = generateType();
            const dir = generateDir();
            game.performNext(type, dir);
            socket.emit('next', {type, dir});
        }
    }

    // 游戏结束
    const stop = () => {
        window.cancelAnimFrame(timer);
        try{
            game.isStop = true;
        }catch(e){
            return;
        }
    }
    
    // 开始
    const start = () => {
        const doms = {
            gameDiv: document.getElementById('local_game'),
            nextDiv: document.getElementById('local_next'),
            timeDiv: document.getElementById('local_time'),
            scoreDiv: document.getElementById('local_score')
        }
        game = new Game();
        const type = generateType();
        const dir = generateDir();
        game.init(doms, type, dir);
        socket.emit('init', {type, dir});
        const nextType = generateType();
        const nextDir = generateDir();
        game.performNext(nextType, nextDir);
        socket.emit('next', {type: nextType, dir: nextDir});
        if(document.getElementById('device').value === 'h5'){
            bindBtnEvent();
        }else{
            bindKeyEvent();
        }
        diySetInterval(move, INTERVAL);
    }

    // 开始
    socket
        .on('start', () => {
            document.getElementById('waiting').innerHTML = '';
            start();
        })
        .on('over', (isWin) => {
            game.gameover(isWin);
        })
        .on('leave', () => {
            document.getElementById('waiting').innerHTML = '对方已离开游戏…';
            stop();
        })
        .on('bottomLine', (bottomLines) => {
            game.intruder(bottomLines);
            socket.emit('intruder', bottomLines);
        })
}
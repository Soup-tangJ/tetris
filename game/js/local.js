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

    // 键盘绑定事件
    const bindKeyEvent = () => {
        document.addEventListener('keydown', (event) => {
            switch(event.keyCode){
                case 37: // left
                case 65:
                    game.left();
                    break;
                case 38: // up
                case 87:
                    game.rotate();
                    break;
                case 39: // right
                case 68:
                    game.right();
                    break;
                case 40: // down
                case 83:
                    game.down();
                    break;
                case 32: // fall
                    game.fall();
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
        let timer;
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
            if(time % 30 === 0){
                game.intruder(generateBottomLines(1));
            }
        }
    }
    
    // 游戏进行逻辑
    const move = (timer) => {
        timeClock();
        if(game.down()) return;

        let lines = 0;
        game.fixed();
        while(game.checkClear()){
            ++lines;
        }
        if(lines > 0){
            score = game.addScore(lines, score);
        }
        if(game.checkGameOver()){
            // 结束游戏
            window.cancelAnimFrame(timer);
            setTimeout(stop, 0);
        }else{
            game.performNext(generateType(), generateDir());
        }
    }

    // 游戏结束
    const stop = () => {
        alert('Game Over');
        if(confirm('还想玩？')){
            history.go(0);
        }else{
            alert('那好吧，88');
            window.close();
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
        game.performNext(generateType(), generateDir());
        if(document.getElementById('device').value === 'h5'){
            bindBtnEvent();
        }else{
            bindKeyEvent();
        }
        // diySetInterval(move, INTERVAL);
    }

    // // 导出
    // this.start = start;
    // 开始
    socket.on('start', () => {
        document.getElementById('waiting').innerHTML = '';
        start();
    })
}
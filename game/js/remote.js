const Remote = function(socket){
    // 游戏对象
    let game;

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
    socket.on('init', ({type, dir}) => {
		console.log('TCL: -----------------------');
		console.log('TCL: Remote -> dir', dir);
		console.log('TCL: -----------------------');
		console.log('TCL: -------------------------');
		console.log('TCL: Remote -> type', type);
		console.log('TCL: -------------------------');
        start(type, dir);
    })
}
    // this.init = init;
    // this.down = down;
    // this.left = left;
    // this.right = right;
    // this.rotate = rotate;
    // this.fall = fall;
    // this.fixed = fixed;
    // this.performNext = performNext;
    // this.checkClear = checkClear;
    // this.checkGameOver = checkGameOver;
    // this.setTime = setTime;
    // this.addScore = addScore;
    // this.intruder = intruder;
const Remote = function(){
    // 游戏对象
    let game;

    // 开始
    const start = () => {
        const doms = {
            gameDiv: document.getElementById('game'),
            nextDiv: document.getElementById('next'),
            timeDiv: document.getElementById('time'),
            scoreDiv: document.getElementById('score')
        }
        game = new Game();
        game.init(doms, generateType(), generateDir());
        game.performNext(generateType(), generateDir());
    }
    
    this.start = start;
}
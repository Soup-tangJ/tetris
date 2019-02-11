const Game = function(){
    // dom元素
    let gameDiv;
    let nextDiv;
    let timeDiv;
    let scoreDiv;

    // 游戏矩阵
    // 预览方块的数据
    let nextData = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    // 游戏区域的数据
    let gameData = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]

    // 当前方块
    let cur;
    // 下一个方块
    let next;
    
    // divs
    let gameDivs = [];
    let nextDivs = [];

    // 初始化游戏区域
    const initDIv = (container, data, divs) => {
        /**
         * @container dom容器（画布）
         * @data 游戏矩阵数据
         * @divs 矩阵对应的dom数组
         */
        for(let i=0; i<data.length; i++){
            const div = [];
            for(let j=0; j<data[0].length; j++){
                const node = document.createElement('div');
                node.className = 'none';
                node.style.top = i * 20 + 'px';
                node.style.left = j * 20 + 'px';
                container.appendChild(node);
                div.push(node);
            }
            divs.push(div);
        }
    }
    // 刷新游戏区域
    const refreshDiv = (data, divs) => {
        /**
         * @data 游戏矩阵数据
         * @divs 矩阵对应的dom数组
         */
        for(let i=0; i<data.length; i++){
            for(let j=0; j<data[0].length; j++){
                if(data[i][j] === 1){
                    divs[i][j].className = 'done';
                }else if(data[i][j] === 2){
                    divs[i][j].className = 'current';
                }else{
                    divs[i][j].className = 'none';
                }
            }
        }
    }

    // 检查点是否合法
    const check = (pos, x, y) => {
        if(pos.x + x < 0){ // 超过上边界
            return false;
        }else if(pos.x + x >= gameData.length){ // 超过下边界
            return false;
        }else if(pos.y + y < 0){ // 超过左边界
            return false;
        }else if(pos.y + y >= gameData[0].length){ // 超过右边界
            return false;
        }else if(gameData[pos.x + x][pos.y + y] === 1){ // 是否跟已有方块碰撞
            return false;
        }else{
            return true;
        }
    }

    // 检测数据是否合法
    const isValid = (pos, data) => {
        for(let i=0; i<data.length; i++){
            for(let j=0; j<data[0].length; j++){
                if(data[i][j] !== 0){
                    if(!check(pos, i, j)){
                        return false;
                    }
                }
            }
        }
        return true;
    }
    
    // 清除数据
    const clearData = () => {
        for(let i=0; i<cur.data.length; i++){
            for(let j=0; j<cur.data[0].length; j++){
                if(check(cur.origin, i, j)){
                    gameData[cur.origin.x + i][cur.origin.y + j] = 0;
                }
            }
        }
    }
    
    // 设置数据
    const setData = () => {
        for(let i=0; i<cur.data.length; i++){
            for(let j=0; j<cur.data[0].length; j++){
                if(check(cur.origin, i, j)){
                    gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j];
                }
            }
        }
    }

    // 方块下移
    const down = () => {
        if(!cur.canDown(isValid)) return false;

        clearData();
        cur.down();
        setData();
        refreshDiv(gameData, gameDivs);
        return true;
    }

    // 方块左移
    const left = () => {
        if(!cur.canLeft(isValid)) return;

        clearData();
        cur.left();
        setData();
        refreshDiv(gameData, gameDivs);
    }
    // 方块右移
    const right = () => {
        if(!cur.canRight(isValid)) return;

        clearData();
        cur.right();
        setData();
        refreshDiv(gameData, gameDivs);
    }
    // 方块变形
    const rotate = () => {
        if(!cur.canRotate(isValid)) return;

        clearData();
        cur.rotate();
        setData();
        refreshDiv(gameData, gameDivs);
    }
    // 方块固定
    const fixed = () => {
        for(let i=0; i<cur.data.length; i++){
            for(let j=0; j<cur.data[0].length; j++){
                if(check(cur.origin, i, j)){
                    if(gameData[cur.origin.x + i][cur.origin.y + j] === 2){
                        gameData[cur.origin.x + i][cur.origin.y + j] = 1;
                    }
                }
            }
        }
        refreshDiv(gameData, gameDivs);
    }

    // 消行
    const checkClear = () => {
        let clearFlag = false;
        for(let i=gameData.length-1; i>=0; i--){
            if(gameData[i].every(item => item === 1)){ 
                clearFlag = true;
                // 从底部开始，遍历是否有一行全为1，是则满足消行条件，将这一行抛出，并在gameData最顶端加一个空行
                gameData = [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    ...gameData.slice(0, i),
                    ...gameData.slice(i + 1)
                ]
                return clearFlag;
            }
        }
        return clearFlag;
    }
    
    // 检查游戏是否结束
    const checkGameOver = () => {
        // 如果第一行有方块的话，那么gameover
        return gameData[0].find(item => item === 1);
    }

    // 准备下移个方块
    const performNext = (type, dir) => {
        cur = next;
        setData();
        next = makeSquare(type, dir);
        refreshDiv(gameData, gameDivs);
        refreshDiv(next.data, nextDivs);
    }
    
    // 干扰功能
    const intruder = (lines) => {
        const linesCount = lines.length;
        gameData = [
            ...gameData.slice(linesCount),
            ...lines
        ];
        cur.origin.x -= linesCount;
        if(cur.origin.x < 0){
            cur.origin.x = 0;
        }
        refreshDiv(gameData, gameDivs);
    }
    
    // 初始化
    const init = (doms, type, dir) => {
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;
        timeDiv = doms.timeDiv;
        scoreDiv = doms.scoreDiv;
        next = makeSquare(type, dir);
        initDIv(gameDiv, gameData, gameDivs);
        initDIv(nextDiv, next.data, nextDivs);
        refreshDiv(next.data, nextDivs);
    }

    // 设置时间
    const setTime = (time) => {
        timeDiv.innerHTML = time;
    }

    // 更新分数
    const addScore = (line, score) => {
        let actScore;
        switch(line) {
            case 1:
                actScore = 10;
                break;
            case 2:
                actScore = 30;
                break;
            case 3:
                actScore = 60;
                break;
            case 4:
                actScore = 100;
                break;
            default:
                break;
        }
        score += actScore;
        scoreDiv.innerHTML = score;
        return score;
    }

    // 导出
    this.GAME_GRID_WIDTH = gameData[0].length;
    this.GAME_GRID_HEIGHT = gameData.length;
    this.init = init;
    this.down = down;
    this.left = left;
    this.right = right;
    this.rotate = rotate;
    this.fall = function(){
        while(down());
    };
    this.fixed = fixed;
    this.performNext = performNext;
    this.checkClear = checkClear;
    this.checkGameOver = checkGameOver;
    this.setTime = setTime;
    this.addScore = addScore;
    this.intruder = intruder;
}
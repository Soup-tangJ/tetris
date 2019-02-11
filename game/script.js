var gameBlock = document.getElementById('game');
var nextBlock = document.getElementById('next');
// 预览方块的数据
var nextData = [
    [2, 2, 0, 0],
    [0, 2, 2, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]

// 游戏区域的数据
var gameData = [
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

// 对应的dom结构
var nextDivs = []
var gameDivs = []

// 初始化游戏区域
var initGame = () => {
    gameData.forEach((row, topIdx) => {
        const gameDiv = [];
        row.forEach((item, leftIdx) => {
            // 设置小方块的位置等属性
            const newNode = document.createElement('div');
            newNode.className = 'none';
            newNode.style.top = (topIdx * 20) + 'px';
            newNode.style.left = (leftIdx * 20) + 'px'; 
            
            gameBlock.appendChild(newNode);
            
            gameDiv.push(newNode);
        })
        gameDivs.push(gameDiv)
    })
}

// 初始化预览区域
var initNext = () => {
    nextData.forEach((row, topIdx) => {
        const nextDiv = [];
        row.forEach((item, leftIdx) => {
            const newNode = document.createElement('div');
            newNode.className = 'none';
            newNode.style.top = topIdx * 20 + 'px';
            newNode.style.left = leftIdx * 20 + 'px';

            nextBlock.appendChild(newNode);

            nextDiv.push(newNode);
        })
        nextDivs.push(nextDiv);
    })
}

// 刷新游戏区域
var refreshGame = () => {
    gameData.forEach((row, x) => {
        row.forEach((item, y) => {
            if(item === 1){
                changeBlock(x, y, gameDivs, 'done');
            }else if(item === 2){
                changeBlock(x, y, gameDivs, 'current');
            }else{
                changeBlock(x, y, gameDivs, 'none');
            }
        })
    })
}

// 刷新预览区域
var refreshNext = () => {
    nextData.forEach((row, x) => {
        row.forEach((item, y) => {
            if(item === 1){
                changeBlock(x, y, nextDivs, 'done');
            }else if(item === 2){
                changeBlock(x, y, nextDivs, 'current');
            }else{
                changeBlock(x, y, nextDivs, 'none');
            }
        })
    })
}
// 改变游戏区域“像素”
const changeBlock = (x, y, data, val) => {
    try {
        data[x][y].className = val;
    } catch (error) {
        throw new Error(error);
    }
}
initGame();
initNext();
refreshGame();
refreshNext();
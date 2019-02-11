const Square = function(){
    // 方块数据
    this.data = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]

    // 原点
    this.origin = {
        x: 0,
        y: 0
    }

    // 方向
    this.dir = 0;
    
    // 旋转状态的数组
    this.rotates = [
        [
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [2, 2, 2, 2],
            [0, 0, 0, 0],
        ],
        [
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [2, 2, 2, 2],
            [0, 0, 0, 0],
        ],
    ]
}
Square.prototype.canRotate = function(isValid) {
    let dir  = (this.dir + 1) % 4;
    
    var test = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    test = JSON.parse(JSON.stringify(this.rotates[dir]))

    return isValid(this.origin, test);
}
Square.prototype.canDown = function(isValid) {
    const test = {};
    test.x = this.origin.x + 1;
    test.y = this.origin.y;

    return isValid(test, this.data);
}
Square.prototype.canLeft = function(isValid){
    const test = {};
    test.x = this.origin.x;
    test.y = this.origin.y - 1;

    return isValid(test, this.data);
}
Square.prototype.canRight = function(isValid){
    const test = {};
    test.x = this.origin.x;
    test.y = this.origin.y + 1;

    return isValid(test, this.data);
}
Square.prototype.down = function(){
    this.origin.x = this.origin.x + 1;
}
Square.prototype.left = function(){
    this.origin.y = this.origin.y - 1;
}
Square.prototype.right = function(){
    this.origin.y = this.origin.y + 1;
}
Square.prototype.rotate = function(num = 0) {
    this.dir = (this.dir + 1 + num) % 4;

    this.data = JSON.parse(JSON.stringify(this.rotates[this.dir]));
}
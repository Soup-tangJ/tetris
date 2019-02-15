class Square {
    constructor() {
        // 方块数据
        this.data = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        // 原点
        this.origin = {
            x: 0,
            y: 0
        };
        // 方向
        this.dir = 0;
    }
    canRotate(isValid) {
        let dir = (this.dir + 1) % 4;
        var test = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        test = JSON.parse(JSON.stringify(this.rotates[dir]));
        return isValid(this.origin, test);
    }
    canDown(isValid) {
        const test = {};
        test.x = this.origin.x + 1;
        test.y = this.origin.y;
        return isValid(test, this.data);
    }
    canLeft(isValid) {
        const test = {};
        test.x = this.origin.x;
        test.y = this.origin.y - 1;
        return isValid(test, this.data);
    }
    canRight(isValid) {
        const test = {};
        test.x = this.origin.x;
        test.y = this.origin.y + 1;
        return isValid(test, this.data);
    }
    down() {
        this.origin.x = this.origin.x + 1;
    }
    left() {
        this.origin.y = this.origin.y - 1;
    }
    right() {
        this.origin.y = this.origin.y + 1;
    }
    rotate(num = 0) {
        this.dir = (this.dir + 1 + num) % 4;
        this.data = JSON.parse(JSON.stringify(this.rotates[this.dir]));
    }
}
// I
class Square1 extends Square{
    constructor() {
        super();
        // 只有各自的rotates数据不同，其他的数据同Square类 
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
                [2, 2, 2, 2],
                [0, 0, 0, 0],
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
                [2, 2, 2, 2],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
        ];
    }
}

// T
class Square2 extends Square{
    constructor() {
        super();
        // 旋转状态的数组
        this.rotates = [
            [
                [0, 2, 0, 0],
                [2, 2, 2, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 2, 0, 0],
                [2, 2, 0, 0],
                [0, 2, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [2, 2, 2, 0],
                [0, 2, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [2, 0, 0, 0],
                [2, 2, 0, 0],
                [2, 0, 0, 0],
                [0, 0, 0, 0],
            ],
        ];
    }
    
}

// J
class Square3 extends Square{
    constructor() {
        super();
        // 旋转状态的数组
        this.rotates = [
            [
                [0, 2, 0, 0],
                [0, 2, 0, 0],
                [2, 2, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [2, 2, 2, 0],
                [0, 0, 2, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [2, 2, 0, 0],
                [2, 0, 0, 0],
                [2, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [2, 0, 0, 0],
                [2, 2, 2, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
        ];
    }
    
}
// L
class Square4 extends Square{
    constructor() {
        super();
        // 旋转状态的数组
        this.rotates = [
            [
                [2, 0, 0, 0],
                [2, 0, 0, 0],
                [2, 2, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 2, 0],
                [2, 2, 2, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [2, 2, 0, 0],
                [0, 2, 0, 0],
                [0, 2, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [2, 2, 2, 0],
                [2, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
        ];
    }
    
}
// O
class Square5 extends Square{
    constructor() {
        super();
        // 旋转状态的数组
        this.rotates = [
            [
                [2, 2, 0, 0],
                [2, 2, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [2, 2, 0, 0],
                [2, 2, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [2, 2, 0, 0],
                [2, 2, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [2, 2, 0, 0],
                [2, 2, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
        ];
    }
    
}
// S
class Square6 extends Square{
    constructor() {
        super();
        // 旋转状态的数组
        this.rotates = [
            [
                [0, 2, 2, 0],
                [2, 2, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [2, 0, 0, 0],
                [2, 2, 0, 0],
                [0, 2, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 2, 2, 0],
                [2, 2, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [2, 0, 0, 0],
                [2, 2, 0, 0],
                [0, 2, 0, 0],
                [0, 0, 0, 0],
            ],
        ];
    }
}
// Z
class Square7 extends Square{
    constructor() {
        super();
        // 旋转状态的数组
        this.rotates = [
            [
                [2, 2, 0, 0],
                [0, 2, 2, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 2, 0, 0],
                [2, 2, 0, 0],
                [2, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [2, 2, 0, 0],
                [0, 2, 2, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 2, 0, 0],
                [2, 2, 0, 0],
                [2, 0, 0, 0],
                [0, 0, 0, 0],
            ],
        ];
    }
    
}

const makeSquare = (index, dir) => {
    let square;
        switch(index){
            case 1:
                square = new Square1();
                break;
            case 2:
                square = new Square2();
                break;
            case 3:
                square = new Square3();
                break;
            case 4:
                square = new Square4();
                break;
            case 5:
                square = new Square5();
                break;
            case 6:
                square = new Square6();
                break;
            case 7:
                square = new Square7();
                break;
            default:
                break;
        }
        square.origin.x = 0;
        square.origin.y = 4;
        square.rotate(dir);

        return square;
}
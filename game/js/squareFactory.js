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
                [2, 0, 0, 0],
                [2, 2, 0, 0],
                [2, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [2, 2, 2, 0],
                [0, 2, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 2, 0, 0],
                [2, 2, 0, 0],
                [0, 2, 0, 0],
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
                [2, 0, 0, 0],
                [2, 2, 2, 0],
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
                [2, 2, 2, 0],
                [0, 0, 2, 0],
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
                [2, 2, 2, 0],
                [2, 0, 0, 0],
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
                [0, 0, 2, 0],
                [2, 2, 2, 0],
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

class SquareFactory{
    make(index, dir){
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
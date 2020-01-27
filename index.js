let snake;
let tileWidth = 15;
let tileHeight = 15;

function setup() {
    createCanvas(600, 450);
    frameRate(3);
    snake = new Snake(150, 150);
}

function draw() {
    clear();
    drawRaster();
    snake.render();
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        snake.moveLeft();
    }
    else if (keyCode === RIGHT_ARROW) {
        snake.moveRight();
    }
    else if (keyCode === UP_ARROW) {
        snake.moveUp();
    }
    else if (keyCode === DOWN_ARROW) {
        snake.moveDown();
    }
    else if (keyCode === 32) {
        snake.addTail();
    }
}

function drawRaster() {
    for (let index = 0; index < width; index += tileWidth) {
        line(index, 0, index, height);
    }

    for (let index = 0; index < height; index += tileHeight) {
        line(0, index, width, index);
    }
}

class Snake {
    tiles = [];

    constructor() {
        this.tiles.push(new Tile(10, 10));
        this.tiles.push(new Tile(9, 10));
        this.tiles.push(new Tile(8, 10));
    }

    render() {
        this.tiles.forEach(tile => {
            tile.applyVelocity();
            tile.render();
        });

        this.inheritVelocity();
    }

    inheritVelocity() {
        for (let i = this.tiles.length - 1; i > 0; i--) {
            this.tiles[i].velocity.x = this.tiles[i - 1].velocity.x;
            this.tiles[i].velocity.y = this.tiles[i - 1].velocity.y;
        }
    }

    addTail() {
        let lastPos = this.tiles[this.tiles.length - 1].position;
        let tail = new Tile(lastPos.x, lastPos.y);
        tail.velocity.x = 0;
        tail.velocity.y = 0;
        this.tiles.push(tail);
    }

    moveDown() {
        this.tiles[0].moveDown();
    }

    moveUp() {
        this.tiles[0].moveUp();
    }

    moveLeft() {
        this.tiles[0].moveLeft();
    }

    moveRight() {
        this.tiles[0].moveRight();
    }
}

class Tile {
    position = { x: 0, y: 0 };
    velocity = { x: 1, y: 0 };

    constructor(startX, startY) {
        this.position = {
            x: startX,
            y: startY
        };
    }

    render() {
        fill(100);
        rect(this.position.x * tileWidth, this.position.y * tileHeight, tileWidth, tileHeight);
    }

    applyVelocity() {
        let finalPosX = this.position.x + this.velocity.x;
        let finalPosY = this.position.y + this.velocity.y;
        if (finalPosX < 0 || finalPosX >= width) {
            return;
        }
        if (finalPosY < 0 || finalPosY >= height) {
            return;
        }

        this.position.x = finalPosX;
        this.position.y = finalPosY;
    }

    moveDown() {
        this.velocity.x = 0;
        this.velocity.y = 1;
    }

    moveUp() {
        this.velocity.x = 0;
        this.velocity.y = -1;
    }

    moveRight() {
        this.velocity.x = 1;
        this.velocity.y = 0;
    }

    moveLeft() {
        this.velocity.x = -1;
        this.velocity.y = 0;
    }
}
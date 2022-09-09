class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Snake {
    constructor(axis, incement, headCoordinates) {
        this.axis = axis,
        this.incement = incement,
        this.headCoordinates = this.headCoordinates
    }

    async start(axis, increment) {
        while (this.headCoordinates.x < gridSize - 1 && this.headCoordinates.y < gridSize - 1 
                && this.headCoordinates.x > 0 && this.headCoordinates.y > 0) {
            moveSnake();
            await timer(500)
        }
        
    }

    setDirection (axis, increment) {
        this.axis = axis;
        this.incement = increment;
    }

    moveSnake() {
        const previousSnakeHead = findDiv(this.headCoordinates);
        this.headCoordinates[this.axis] += this.increment;
        findDiv(this.headCoordinates).setAttribute('class', 'column snake');
        previousSnakeHead.setAttribute('class', 'column');
    }
}

// Create grid
const canvas = document.querySelector('#game-grid');
const gridSize = 20;
const grid = [];
let snakeHead = new Coordinate(gridSize / 2, gridSize / 2);
for (let i = 0; i < gridSize; i++) {
    grid[i] = [];
    const row = document.createElement("div");
    row.setAttribute("id", `row-${i}`);
    row.setAttribute("class", `row`);
    canvas.appendChild(row);
    for (let j = 0; j < gridSize; j++) {
        grid[i][j] = j;
        const column = document.createElement("div");
        column.setAttribute("id", `column-${i}`);
        column.setAttribute("class", `column`);
        row.appendChild(column);
    }
    
}

// Add snake in centre
const findDiv = (coordinate) => document.getElementsByClassName('row')[coordinate.y].getElementsByClassName('column')[coordinate.x];
findDiv(snakeHead).setAttribute('class', 'column snake');

const timer = ms => new Promise(res => setTimeout(res, ms));

// Move snake 
async function moveSnake (coordinate, increment) {
    clearTimeout();
    while (snakeHead.x < gridSize - 1 && snakeHead.y < gridSize - 1 && snakeHead.x > 0 && snakeHead.y > 0) {
        console.log('start loop');
        const previousSnakeHead = findDiv(snakeHead);
        snakeHead[coordinate] += increment;
        findDiv(snakeHead).setAttribute('class', 'column snake');
        previousSnakeHead.setAttribute('class', 'column');
        await timer(500);
        console.log('endLoop');
    }
    
}
let dir = moveSnake("x", 1);

// Event listeners
document.addEventListener("keydown", async (event) => {
    switch(event.key) {
        case "ArrowUp":
            while ("ArrowUp") {
                moveSnake("y", -1);
                await timer(500);
            }            
            break;  
        case "ArrowDown":
            moveSnake("y", 1);
            break;  
        case "ArrowLeft":
            moveSnake("x", -1);
            break; 
        case "ArrowRight":
            moveSnake("x", 1);
            break;
    }
});

// Randomly generate food

// Grow snake when food eaten

// Check for collissssssions with self

// OVerflow at the sides 


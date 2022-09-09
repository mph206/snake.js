import Snake from "./snake.js";

// Create grid
const canvas = document.querySelector('#game-grid');
const gridSize = 20;
const grid = [];
let snake = new Snake(gridSize);
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

snake.start();

// Event listeners
document.addEventListener("keydown", async (event) => {
    switch(event.key) {
        case "ArrowUp":
            snake.setDirection("y", -1);
            break;  
        case "ArrowDown":
            snake.setDirection("y", 1);
            break;  
        case "ArrowLeft":
            snake.setDirection("x", -1);
            break; 
        case "ArrowRight":
            snake.setDirection("x", 1);
            break;
    }
});

// Randomly generate food

// Grow snake when food eaten

// Check for collissssssions with self

// OVerflow at the sides 


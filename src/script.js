import Grid from "./grid.js";
import Snake from "./snake.js";

const gridSize = 20;
const grid = new Grid(gridSize);

// Event listeners
// TODO disable reversing
document.addEventListener("keydown", async (event) => {
    switch(event.key) {
        case "ArrowUp":
            grid.snake.setDirection("y", -1);
            break;  
        case "ArrowDown":
            grid.snake.setDirection("y", 1);
            break;  
        case "ArrowLeft":
            grid.snake.setDirection("x", -1);
            break; 
        case "ArrowRight":
            grid.snake.setDirection("x", 1);
            break;
    }
});

grid.generateFood();

// Grow snake when food eaten


// Check for collissssssions with self

// OVerflow at the sides 


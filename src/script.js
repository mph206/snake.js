import Grid from "./grid.js";
import Snake from "./snake.js";

const gridSize = 20;
const grid = new Grid(gridSize);
const snake = new Snake(gridSize);

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

grid.generateFood(snake.headCoordinates);

// Grow snake when food eaten
snake.notifyFoodCoordinates(grid.foodCoordinates);

// Check for collissssssions with self

// OVerflow at the sides 


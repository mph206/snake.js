import Coordinate from "./coordinate.js";
import Snake from "./snake.js";
import { findDiv } from "./utils.js";

export default class Grid {
    grid = [];
    snake;
    foodCoordinates;
    constructor(gridSize) {
        this.gridSize = gridSize;
        this.build();
        this.snake = new Snake(this);
    }

    build() {
        const canvas = document.querySelector('#game-grid');
        for (let i = 0; i < this.gridSize; i++) {
            this.grid[i] = [];
            const row = document.createElement("div");
            row.setAttribute("id", `row-${i}`);
            row.setAttribute("class", `row`);
            canvas.appendChild(row);
            for (let j = 0; j < this.gridSize; j++) {
                this.grid[i][j] = j;
                const column = document.createElement("div");
                column.setAttribute("id", `column-${j}`);
                column.setAttribute("class", `column`);
                row.appendChild(column);
            }    
        }
    }

    generateFood() {
        const freeSpace = [...this.grid];
        freeSpace[this.snake.headCoordinates.x].splice(this.snake.headCoordinates.y, 1);
        const foodRow = freeSpace[Math.floor((Math.random() * (freeSpace.length - 1))) + 1];
        const foodY = foodRow[Math.floor((Math.random() * (foodRow.length - 1))) + 1];
        const foodX = freeSpace.indexOf(foodRow);
        this.foodCoordinates = new Coordinate(foodX, foodY);
        findDiv(this.foodCoordinates).setAttribute('class', 'column food');
    }
}
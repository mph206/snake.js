import Coordinate from './coordinate.js';
import { findDiv } from './utils.js';

export default class Snake {
    axis;
    increment;
    snakeBody = [];
    
    constructor(grid) {
        this.grid = grid;
        this.listenForChangeOfDirection();
        this.start();
    }

    get tailCoordinates() {
        return this.snakeBody[this.snakeBody.length - 1];
    }

    set headCoordinates(headCoordinates) {
        this.snakeBody[0] = headCoordinates;
    }

    get headCoordinates() {
        return this.snakeBody[0];
    }

    async start() {
        this.headCoordinates = new Coordinate(this.grid.gridSize / 2, this.grid.gridSize / 2);
        findDiv(this.headCoordinates).setAttribute('class', 'cell snake');
        this.setDirection("x", 1);
        
        while (this.headCoordinates.x < this.grid.gridSize 
                && this.headCoordinates.y < this.grid.gridSize 
                && this.headCoordinates.x >= 0 && this.headCoordinates.y >= 0) {            
            this.moveSnake();
            await new Promise((_) => setTimeout(_, 200));
        }
    }

    listenForChangeOfDirection() {
        document.addEventListener("keydown", async (event) => {
            switch(event.key) {
                case "ArrowUp":
                    this.setDirection("y", -1);
                    break;  
                case "ArrowDown":
                    this.setDirection("y", 1);
                    break;  
                case "ArrowLeft":
                    this.setDirection("x", -1);
                    break; 
                case "ArrowRight":
                    this.setDirection("x", 1);
                    break;
            }
        });
    }

    setDirection (axis, increment) {
        this.axis = axis;
        this.increment = increment;
    }

    moveSnake() {
        const tail = this.tailCoordinates;
        const tailEnd = findDiv(this.snakeBody[this.snakeBody.length - 1]);
        if (this.snakeBody.length === 1) {
            this.headCoordinates[this.axis] += this.increment;
        } else {
            let newHead = new Coordinate(this.headCoordinates.x, this.headCoordinates.y);
            newHead[this.axis] += this.increment;
            this.snakeBody.unshift(newHead);
            this.snakeBody.pop();
        }

        findDiv(this.headCoordinates).setAttribute('class', 'cell snake');
        tailEnd.setAttribute('class', 'cell');
        this.checkForFoodCollision();
    }

    checkForFoodCollision() {
        if (JSON.stringify(this.headCoordinates) === JSON.stringify(this.grid.foodCoordinates)) {
            this.eatFood();
            this.grid.generateFood();
        }
    }

    // TODO: Adds food in direction or travel rather than direction of tail
    eatFood() {
        
        this.snakeBody.push(this.calculateNewTail());
        findDiv(this.tailCoordinates).setAttribute('class', 'cell snake');
    }

    calculateNewTail() {
        let xCoord;
        let yCoord;

        if (this.axis === "x") {
            xCoord = this.tailCoordinates.x - this.increment;
            yCoord = this.tailCoordinates.y;
        } else if (this.axis === "y") {
            xCoord = this.tailCoordinates.x;
            yCoord = this.tailCoordinates.y - this.increment;
        }
        return new Coordinate(xCoord, yCoord);
    }
}
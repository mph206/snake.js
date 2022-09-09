import Coordinate from './coordinate.js';
import { findDiv } from './utils.js';
import Grid from './grid.js';

export default class Snake {
    axis;
    increment;
    snakeBody;
    headCoordinates;
    
    constructor(grid) {
        this.grid = grid;
        this.start();
    }

    get tailCoordinate() {
        return this.snakeBody[this.snakeBody.length - 1];
    }

    async start() {
        this.headCoordinates = new Coordinate(this.grid.gridSize / 2, this.grid.gridSize / 2);
        this.snakeBody = [this.headCoordinates];
        findDiv(this.headCoordinates).setAttribute('class', 'column snake');
        this.setDirection("x", 1);
        
        while (this.headCoordinates.x < this.grid.gridSize && this.headCoordinates.y < this.grid.gridSize 
                && this.headCoordinates.x >= 0 && this.headCoordinates.y >= 0) {            
            this.moveSnake();
            // console.log(this.snakeBody);
            await new Promise((_) => setTimeout(_, 200));
        }
    }

    setDirection (axis, increment) {
        this.axis = axis;
        this.increment = increment;
    }

    moveSnake() {
        const tailEnd = findDiv(this.snakeBody[this.snakeBody.length - 1]);
        console.log(tailEnd);
        this.headCoordinates[this.axis] += this.increment;
        findDiv(this.headCoordinates).setAttribute('class', 'column snake');
        tailEnd.setAttribute('class', 'column');
        this.checkForFoodCollision();
    }

    checkForFoodCollision() {
        if (JSON.stringify(this.headCoordinates) === JSON.stringify(this.grid.foodCoordinates)) {
            this.eatFood();
            this.grid.generateFood();
        }
    }

    eatFood() {
        this.snakeBody.push(this.calculateNewTail());
        console.log(this.snakeBody);
        findDiv(this.tailCoordinate).setAttribute('class', 'column snake');
    }

    calculateNewTail() {
        let xCoord;
        let yCoord;

        if (this.axis === "x") {
            xCoord = -this.increment;
            yCoord = 0;
        } else if (this.axis === "y") {
            xCoord = 0;
            yCoord = -this.increment;
        }
        return new Coordinate(xCoord, yCoord);
    }
}
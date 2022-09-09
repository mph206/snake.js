import Coordinate from './coordinate.js';
import { findDiv } from './utils.js';

export default class Snake {
    foodCoordinates;
    constructor(gridSize) {
        this.gridSize = gridSize;
        this.start();
    }

    async start() {
        this.headCoordinates = new Coordinate(this.gridSize / 2, this.gridSize / 2);
        findDiv(this.headCoordinates).setAttribute('class', 'column snake');
        this.setDirection("x", 1);
        
        while (this.headCoordinates.x < this.gridSize - 1 && this.headCoordinates.y < this.gridSize - 1 
                && this.headCoordinates.x > 0 && this.headCoordinates.y > 0) {            
            this.moveSnake();
            await new Promise((_) => setTimeout(_, 500));
        }
    }

    setDirection (axis, increment) {
        this.axis = axis;
        this.increment = increment;
    }

    moveSnake() {
        const previousSnakeHead = findDiv(this.headCoordinates);
        this.headCoordinates[this.axis] += this.increment;
        findDiv(this.headCoordinates).setAttribute('class', 'column snake');
        previousSnakeHead.setAttribute('class', 'column');
        this.checkForFoodCollision();
    }

    notifyFoodCoordinates(foodCoordinates) {
        this.foodCoordinates = foodCoordinates;
    }

    checkForFoodCollision() {
        if (JSON.stringify(this.headCoordinates) === JSON.stringify(this.foodCoordinates)) {
            console.log('collision');
        }
    }
}
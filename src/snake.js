import Coordinate from './coordinate.js';

const timer = ms => new Promise(res => setTimeout(res, ms));

export default class Snake {
    constructor(gridSize) {
        this.gridSize = gridSize;
    }

    async start() {
        this.headCoordinates = new Coordinate(this.gridSize / 2, this.gridSize / 2);
        this.findDiv(this.headCoordinates).setAttribute('class', 'column snake');
        this.setDirection("x", 1);
        
        while (this.headCoordinates.x < this.gridSize - 1 && this.headCoordinates.y < this.gridSize - 1 
                && this.headCoordinates.x > 0 && this.headCoordinates.y > 0) {            
            this.moveSnake();
            await timer(500);
        }
    }

    findDiv (coordinate) {
        return document.getElementsByClassName('row')[coordinate.y].getElementsByClassName('column')[coordinate.x];
    } 

    setDirection (axis, increment) {
        this.axis = axis;
        this.increment = increment;
    }

    moveSnake() {
        const previousSnakeHead = this.findDiv(this.headCoordinates);
        this.headCoordinates[this.axis] += this.increment;
        this.findDiv(this.headCoordinates).setAttribute('class', 'column snake');
        previousSnakeHead.setAttribute('class', 'column');
    }
}
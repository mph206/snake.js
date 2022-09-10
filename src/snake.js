import Coordinate from './coordinate.js';
import { findDiv } from './utils.js';

export default class Snake {
    axis;
    increment;
    snakeBody = [];
    selfCollision = false;
    
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
        
        while (!this.selfCollision
                && this.headCoordinates.x < this.grid.gridSize 
                && this.headCoordinates.y < this.grid.gridSize 
                && this.headCoordinates.x >= 0 
                && this.headCoordinates.y >= 0) {            
            this.moveSnake();
            await new Promise((_) => setTimeout(_, 200));
        }
    }

    listenForChangeOfDirection() {
        document.addEventListener("keydown", async (event) => {
            switch(event.key) {
                case "ArrowUp":
                    if (this.axis !== "y" || this.increment !== 1) {
                        this.setDirection("y", -1);
                    }
                    break;  
                case "ArrowDown":
                    if (this.axis !== "y" || this.increment !== -1) {
                        this.setDirection("y", 1);
                    }
                    break;  
                case "ArrowLeft":
                    if (this.axis !== "x" || this.increment !== 1) { 
                        this.setDirection("x", -1);
                    }
                    break; 
                case "ArrowRight":
                    if (this.axis != "x" || this.increment != -1) { 
                        this.setDirection("x", 1);
                    }
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

        console.log("head")
        console.log(this.headCoordinates)
        findDiv(this.headCoordinates).setAttribute('class', 'cell snake');
        tailEnd.setAttribute('class', 'cell');
        this.checkForFoodCollision();
        this.checkForSelfCollision();
    }

    checkForFoodCollision() {
        if (JSON.stringify(this.headCoordinates) === JSON.stringify(this.grid.foodCoordinates)) {
            this.eatFood();
            this.grid.generateFood();
        }
    }

    checkForSelfCollision() {
        const collisionCandidates = this.snakeBody.slice(1);
        if (collisionCandidates.map((element) => JSON.stringify(element)).includes(JSON.stringify(this.headCoordinates))) {
            this.grid.gameOver = true;
            this.selfCollision = true;
        }
    }

    eatFood() {        
        this.snakeBody.push(this.calculateNewTail());
        findDiv(this.tailCoordinates).setAttribute('class', 'cell snake');
    }
    
    calculateNewTail() {
        // TODO: Adds food in direction or travel rather than direction of tail
        
        // Look at direction of last 2 coords
        let xCoord;
        let yCoord;
        let finalTwoCoordinates;

        // if (this.snakeBody.length > 1) {
        //     finalTwoCoordinates = this.snakeBody.slice(this.snakeBody.length - 2);
        //     console.log(finalTwoCoordinates);
        //     if (finalTwoCoordinates[0]["x"] === finalTwoCoordinates[1]["x"]) {
        //         if (finalTwoCoordinates[0]["y"] > finalTwoCoordinates[1]["y"]) {
        //         } else {
        //             xCoord = this.tailCoordinates.x;
        //             yCoord = this.tailCoordinates.y - this.increment;
        //         }
        //     }
        // } else {
            if (this.axis === "x") {
                xCoord = this.tailCoordinates.x - this.increment;
                yCoord = this.tailCoordinates.y;
            } else if (this.axis === "y") {
                xCoord = this.tailCoordinates.x;
                yCoord = this.tailCoordinates.y - this.increment;
            }
        // }    
        return new Coordinate(xCoord, yCoord);
    }
}
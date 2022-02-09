import Paddle from "/src/paddle.js";
import InputHandler from '/src/input.js';
import Ball from '/src/ball.js';
import Brick from '/src/brick.js';
import { buildLevel, level_1, level_2 } from '/src/levels.js';

const lives = 2;

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4,
    GAMEEND: 5
}

export default class Game {

    constructor(gameWidth, gameHeight) {

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gamestate = GAMESTATE.MENU;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.gameObj = [];
        this.bricks=[];
        this.lives = lives;
        this.levels = [level_1, level_2];
        this.currentLevel = 0;
        new InputHandler(this.paddle, this);

    }

    start() {
        if(this.gamestate !== GAMESTATE.MENU && this.gamestate !== GAMESTATE.NEWLEVEL) return;

        if(this.currentLevel >= this.levels.length){
            this.gamestate = GAMESTATE.GAMEEND;
            return;
        }

        this.bricks = buildLevel(this, this.levels[this.currentLevel]);
        this.ball.reset();
        // for(let i = 0; i < 10;i++){
        //     bricks.push(new Brick(this, {x: i*52, y:20}));
        // }

        this.gameObj = [this.ball, this.paddle];

        this.gamestate = GAMESTATE.RUNNING;

    }

    update(deltaTime) {

        // old manual method
        // this.paddle.update(deltaTime);
        // this.ball.update(deltaTime);
        // this.brick.update(deltaTime);

        if(this.lives === 0)
        {
            this.gamestate = GAMESTATE.GAMEOVER;
        }

        // To pause the game simply stop rendering the game
        if (this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.MENU || this.gamestate === GAMESTATE.GAMEOVER || this.gamestate === GAMESTATE.GAMEEND) return;
        

        // adding gameObj and bricks in a single array
        //this.gameObj = [...this.gameObj, ...this.bricks] method is slowing the game alot
        [...this.gameObj, ...this.bricks].forEach((obj) => obj.update(deltaTime));

        // doesn't renders the brick that's markedForDeletion
        this.bricks = this.bricks.filter((brick) => !brick.markedForDeletion);

        if(this.bricks.length === 0 && this.currentLevel < this.levels.length){
            this.currentLevel++;
            this.gamestate = GAMESTATE.NEWLEVEL;
            this.start();
        }

    }

    draw(ctx) {

        // this.paddle.draw(ctx);
        // this.ball.draw(ctx);

        [...this.gameObj, ...this.bricks].forEach((obj) => obj.draw(ctx));

        if (this.gamestate == GAMESTATE.PAUSED) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fill();

            ctx.font = "30px arial";
            ctx.fillStyle = "white";
            ctx.fillText("Paused", this.gameWidth/2, this.gameHeight/2);
        }

        if(this.gamestate == GAMESTATE.MENU){

            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fill();

            ctx.font = "30px arial";
            ctx.fillStyle = "white";
            ctx.fillText("Press 'ENTER' to 'START'", this.gameWidth/2 - 150, this.gameHeight/2);

        }

        if(this.gamestate === GAMESTATE.GAMEOVER){
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fill();

            ctx.font = "30px arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", this.gameWidth/2, this.gameHeight/2);

            ctx.font = "20px arial";
            ctx.fillText("Press 'R' to Restart", this.gameWidth/2, this.gameHeight/2 + 60);
        }

        if(this.gamestate === GAMESTATE.GAMEEND){
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fill();

            ctx.font = "30px arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Congratulations, You completed the game", this.gameWidth/2, this.gameHeight/2);
        }

    }

    restart() {
        this.lives = 2;
        this.currentLevel = 0;
        this.gamestate = GAMESTATE.MENU;
        // this.start();
    }

    togglePause() {

        if (this.gamestate == GAMESTATE.PAUSED) {

            this.gamestate = GAMESTATE.RUNNING;

        } else {

            this.gamestate = GAMESTATE.PAUSED;
        }
    }
}
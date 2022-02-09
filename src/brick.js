import { detectCollision } from '/src/collisionDetection.js'

export default class Brick {

    constructor(game, position) {

        this.image = document.getElementById('img_brick');
        this.position = position;  //initial position of the ball
        this.width = 80;
        this.height = 24;
        this.game = game;

        this.markedForDeletion = false;

    }

    update() {

        if(detectCollision(this.game.ball, this)){

            this.game.ball.speed.y = -this.game.ball.speed.y;
            this.markedForDeletion = true;

        }

    }
    
    draw(ctx) {
        
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);

    }

}
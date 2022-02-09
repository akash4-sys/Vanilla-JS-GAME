import { detectCollision } from '/src/collisionDetection.js'

export default class Ball {

    constructor(game) {

        this.image = document.getElementById('img_ball');
        this.size = 16;
        this.gameHeight = game.gameHeight;
        this.gameWidth = game.gameWidth;
        this.game = game;
        this.reset();

    }

    reset() {
        this.speed = { x :4, y: -5 };        //speed of the ball
        this.position = { x: 100, y: 400};  //initial position of the ball
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }

    update(deltaTime) {

        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // wall on left or right
        if((this.position.x + this.size) > this.gameWidth || this.position.x < 0){
            this.speed.x = -this.speed.x;
        }

        // wall on top or bottom
        if(this.position.y < 0){
            this.speed.y = -this.speed.y;
        }

        if((this.position.y + this.size) > this.gameHeight){
            this.game.lives--;
            this.reset();
        }

        // collision with paddle
        
        if(detectCollision(this, this.game.paddle)){

            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;

        }
    }

} 
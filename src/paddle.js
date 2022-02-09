export default class Paddle{

    constructor(game) {

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        
        this.width = 150;
        this.height = 30;

        this.position = {
            x: game.gameWidth/2 - this.width / 2,
            y: game.gameHeight - this.height - 10,
        }

        this.maxSpeed = 7;
        this.speed = 0;

    }

    moveLeft() {
        this.speed = -this.maxSpeed;
    }

    moveRight() {
        this.speed = +this.maxSpeed;
    }

    stop() {
        this.speed = 0;
    }
    
    draw(ctx) {
        ctx.fillStyle = "purple";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime) {

        // deltatime is how much time has changed since last update
        // this.position.x += 5 / deltaTime; 

        
        this.position.x += this.speed;

        if(this.position.x < 0 ){
            this.position.x = 0;
        }

        if((this.position.x + this.width) > this.gameWidth){
            this.position.x = this.gameWidth - this.width;
        }
    }

}
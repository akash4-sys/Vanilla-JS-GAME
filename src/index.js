import Game from '/src/game.js';

let canvas = document.getElementById('gameScreen');
let ctx = canvas.getContext('2d');

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

// In Canvas once drawn the the drawing is still supposed to be there
// even after someone deleted it. But it doesn't seems to be case here.
// Anyway this line is just to make sure that doesn't happens.
ctx.clearRect(0, 0, 800, 600);

// ctx.fillStyle = "#f00";
// ctx.fillRect(20, 20, 100, 100);

// ctx.fillStyle = "#00f";
// ctx.fillRect(300, 400, 50, 50);

let game = new Game(GAME_WIDTH, GAME_HEIGHT);
// game.start();

let lastTime = 0;

function gameLoop(timestamp) {

    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    game.update(deltaTime);
    game.draw(ctx);

    // When next frame is ready it will call gameloop
    requestAnimationFrame(gameLoop);

}

requestAnimationFrame(gameLoop);
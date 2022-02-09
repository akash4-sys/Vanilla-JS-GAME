export default class InputHandler {

    constructor(paddle, game) {

        document.addEventListener('keydown', (event) => {
           
            console.log(event.keyCode);
            // console.log(game.gamestate);

            switch(event.keyCode){
            
                case 37: case 65: paddle.moveLeft();
                break;
                case 39: case 68: paddle.moveRight();
                break;
                case 27: case 32: game.togglePause(); 
                break;
                case 13: game.start();
                break;
                case 82: game.restart();
                break;
            };

        });

        document.addEventListener('keyup', (event) => {

            switch(event.keyCode){

                // Here paddle.speed just makes it little smooth while stopping giving
                // a imagination of momentum
                case 37: case 65: if(paddle.speed < 0) { paddle.stop(); }
                break;
                case 39: case 68: if(paddle.speed > 0) { paddle.stop(); }
                break;
            };

        })

    }

}
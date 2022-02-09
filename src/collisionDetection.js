// This function just returns whether there is collision

export function detectCollision(ball, gameObj) {

    let bottom_of_ball = ball.position.y + ball.size;
    let top_of_ball = ball.position.y;

    let top_of_obj = gameObj.position.y;
    let left_of_obj = gameObj.position.x;
    let right_of_obj = gameObj.position.x + gameObj.width;
    let bottom_of_obj = gameObj.position.y + gameObj.height;

    if (bottom_of_ball >= top_of_obj &&
            top_of_ball <= bottom_of_obj &&
            ball.position.x >= left_of_obj &&
            ball.position.x + ball.size <= right_of_obj )
        {

        return true;

    }
    else{
        return false;
    }

}
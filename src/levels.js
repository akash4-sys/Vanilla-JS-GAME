import Brick from '/src/brick.js';

export function buildLevel(game, level) {
    let bricks = [];
    
    level.forEach((row, rowIndex) => {

        row.forEach((brick, brickIndex) => {

            if(brick === 1){

                // position of the bricks
                let position = {
                    x: 80 * brickIndex,
                    y: 50 + (24 * rowIndex)
                };

                bricks.push(new Brick(game, position));
            }
        })

    });

    return bricks;
}

export const level_1 = [

    // [1,1,1,1,1,1,1,1,1,1,1],
    // [1,1,1,1,1,1,1,1,1,1,1],
    // [1,1,0,1,0,1,0,1,1,1,1],
    // [1,1,0,1,1,1,0,1,0,1,1]
    [0,0,0,0,0,0,1,0,0,0,0]

]
;
export const level_2 = [

    // [1,1,1,1,1,1,1,1,1,1,1],
    // [1,1,1,1,1,1,1,1,1,1,1],
    // [1,1,0,1,0,1,0,1,1,1,1],
    // [0,0,0,1,1,1,0,1,1,1,1]
    [1,0,0,0,0,0,1,0,0,0,0]
];
export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;
/**
 * create stage from multi-dimensional Array
 */
export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, "clear"])
  );
//Array from another Array created from stage Height
//2nd arg fills the empty array..foreach row,create new array from stage Width and fill it with another array

export const checkCollision = (player, stage, { x, y }) => {
  for (let i = 0; i < player.tetromino.length; i++) {
    //rows
    for (let j = 0; j < player.tetromino[i].length; j++) {
      //cell
      //1. Check we're in a Tetromino cell
      if (player.tetromino[i][j] !== 0) {
        //value from loops to ensure we are on a cell making the tetromino
        if (
          //2. check that our movement is withing game area vertical borders (y)
          //we shouldn't go below bottom of play area
          //check if stages [y] value has value i.e stage[5] ==>
          /**
           * stage [ current index + players_original_position + intended_move_pos ]
           */
          !stage[i + player.pos.y + y] ||
          //3. check move is within play area in (X axis)
          !stage[i + player.pos.y + y][j + player.pos.x + x] ||
          //4. check cell we move to isn't set to clear
          //stage[x][y][0,"clear"] checks if the second value of the multidimensional array is not equivalent to clear
          stage[i + player.pos.y + y][j + player.pos.x + x][1] !== "clear"
        ) {
          return true;
        }
      }
    }
  }
};

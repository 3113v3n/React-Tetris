import { useCallback, useState } from "react";
import { checkCollision, STAGE_WIDTH } from "../gameHelpers";
import { TETROMINOS, randomTetrominos } from "../tetrominos";
export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape, //grab first item in Array and returns black screen on first load
    collided: false
  });
  const rotate = (tetromino, direction) => {
    //make all Rows become columns (transpose)
    const rotatedTetro = tetromino.map(
      (_, index) => tetromino.map(col => col[index])
      /**
       * let tetromino =
       *
       * [0,I,0]
       * [0,I,0]
       * [0,I,0]
       *
       * 1st map => index [0,1,2]
       * 2nd map shifts to column =>( 0[0],I[1],0[2] ) COLUMN
       *
       * [0],[0],[0]
       * [I],[I],[I]
       * [0],[0],[0]
       */
    );
    //reverse each ROW to get rotated matrix
    // > 0 clockwise motion whereas <0 is anticlockwise
    if (direction > 0) return rotatedTetro.map(row => row.reverse());
    return rotatedTetro.reverse();
  };
  const playerRotate = (stage, dir) => {
    //dont mutate state so we do a deep clone of player state
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);
    //save position
    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      //track how many steps we move back and forth
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        //ofset is > that screen width
        rotate(clonedPlayer.tetromino, -dir); //we rotate in opposite direction
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    setPlayer(clonedPlayer);
  };
  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prevState => ({
      ...prevState,
      //x: (prevState.pos.x += x)
      //update previous value by adding the passed value i.e x:(0 + -1)
      pos: { x: (prevState.pos.x += x), y: (prevState.pos.y += y) },
      collided
    }));
  };
  const resetPlayer = useCallback(() => {
    setPlayer({
      //STAGE_WIDTH / 2 - 2,==> positions tetromino in the middle
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetrominos().shape,
      collided: false
    });
  }, []);
  return [player, updatePlayerPos, resetPlayer, playerRotate];
};

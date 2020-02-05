import { useEffect, useState } from "react";
import { createStage } from "../gameHelpers";

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);
  useEffect(() => {
    setRowsCleared(0);
    const sweepRows = newStage =>
      //pass in stage to function
      newStage.reduce((ack, row) => {
        //reduce allows for creation of new array
        if (row.findIndex(cell => cell[0] === 0) === -1) {
          //check if the row contains any cell,
          //==> check if first value in cell array === 0
          //===> findIndex() returns -1 to mean NOT FOUND
          //if row is filled,
          // 1.add Row to state
          setRowsCleared(prevState => prevState + 1);
          //2. add a completely empty row at the top of our array using unshift method
          ack.unshift(new Array(newStage[0].length).fill([0, "clear"]));
          return ack;
        }
        //if row is not full, return as is
        ack.push(row);
        return ack;
      }, []);
    /**
     *  Adding the updater function in useEffect prevents us from adding it as a dependency
     * **/
    const updateStage = prevStage => {
      //flush the stage (clear from previous render)
      const newStage = prevStage.map(row =>
        /**
         * *returns empty cell if the second item in the array === "clear"
         */
        row.map(cell => (cell[1] === "clear" ? [0, "clear"] : cell))
      );
      // draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              /**
               * returns value of JSLTZO the we set second argument as either clear or merged
               * to know whether or not we clear the row
               */
              `${player.collided ? "merged" : "clear"}`
            ];
          }
        });
      });
      //check if we collided
      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }
      return newStage;
    };
    setStage(prev => updateStage(prev));
  }, [player, resetPlayer]);
  return [stage, setStage,rowsCleared];
};

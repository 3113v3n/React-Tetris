import { useState, useEffect, useCallback } from "react";
export const useGameStatus = rowsCleared => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);
  const linePoints = [40, 100, 300, 1200];
  const calcScore = useCallback(() => {
    //check if we have score
    if (rowsCleared > 0) {
      //original Tetris score calculation
      setScore(
        prevState => prevState + linePoints[rowsCleared - 1] * (level + 1)
        //linePoints[rowsCleared - 1] :
        //line points array represent rows cleared i.e
        //[1_row_cleared,2_rows_cleared,3_rows_cleared,4_rows_cleared]
        //so if we cleared 3 rows we need to capture value in linepoints[INDEX 2] hence [ rowsCleared - 1 ]
        //levels start from 0 thus plus 1
      );
      setRows(prevState => prevState + rowsCleared);
    }
  }, [level, linePoints, rowsCleared]);
  useEffect(() => calcScore(), [calcScore, rowsCleared, score]);
  return [score, setScore, rows, setRows, level, setLevel];
};

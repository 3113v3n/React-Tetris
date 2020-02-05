import React, { useState } from "react";
import { StyledTetris, StyledTetrisWrapper } from "./styles/StyledTetris";
import { createStage, checkCollision } from "../gameHelpers";
//components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
//custom hooks
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useInterval } from "../hooks/useInterval";
import { useGameStatus } from "../hooks/useGameStatus";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );
  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
      //moves item along X axis (right and Left)
    }
  };
  const startGame = () => {
    //reset to default
    setStage(createStage);
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setLevel(0);
    setRows(0);
  };
  const drop = () => {
    //Increase level when player has cleared 10 levels
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      //also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      //plays around with the Y axis
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      //Game Over
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      //merge tetrominos
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };
  const keyUp = ({ keyCode }) => {
    //set Interval when Player releases the down Key
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };
  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };
  const move = ({ keyCode }) => {
    //gets keyCode that are pressed
    if (!gameOver) {
      if (keyCode === 37) {
        //code for LEFT ARROW
        //we move player 1 backwards step on the X-axis
        movePlayer(-1);
      }
      if (keyCode === 39) {
        //code for Right
        //we move player 1 forward step on the X-axis
        movePlayer(1);
      }
      if (keyCode === 40) {
        //KeyCode for down
        dropPlayer();
      }
      if (keyCode === 38) {
        //UP Arrow
        playerRotate(stage, 1); //clockwise rotation
      }
    }
  };
  useInterval(() => drop(), dropTime);
  return (
    <StyledTetrisWrapper
      role={"button"}
      tabIndex={"0"}
      onKeyDown={event => move(event)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text={"Game Over"} />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}

          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};
export default Tetris;

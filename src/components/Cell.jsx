import React from "react";
import { StyledCell } from "./styles/StyledCell";
import { TETROMINOS } from "../tetrominos";

const Cell = ({ type }) => (
  <StyledCell type={type} color={TETROMINOS[type].color} />
);
export default React.memo(Cell);
/*
TETROMINOS[type].color} grabs the color of a given tetromino i.e
TETROMINOS[L].color =>223,173,36"
 */

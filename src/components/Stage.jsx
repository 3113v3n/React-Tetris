import React from "react";
import Cell from "./Cell";
import { StyledStage } from "./styles/StyledStage";
const Stage = ({ stage }) => (
  <StyledStage width={stage[0].length} height={stage.length}>
    {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
  </StyledStage>
);
export default Stage;
/**
 * stage.map returns row,and each row is an array that holds cell
 * thus we map through that too
 * to get cells
 *
 * stage is an array=> stage.length returns the height of the stage
 * stage[0].length shows the number of items in the row which is equivalent to width
 */

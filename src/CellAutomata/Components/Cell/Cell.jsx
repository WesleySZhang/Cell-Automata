import React, { Component } from "react";

import "./Cell.css";

export default class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { col, row, isAlive, onMouseDown, onMouseEnter, onMouseUp } =
      this.props;
    let cellState = "cell-dead";

    if (isAlive) {
      cellState = "cell-alive";
    }

    return (
      <div
        // id={`cell-${row}-${col}`}
        className={`cell ${cellState}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      ></div>
    );
  }
}

export const DEFAULT_CELL = {
  row: 0,
  col: 0,
};

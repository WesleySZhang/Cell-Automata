import React, { Component } from "react";
import { gameOfLife } from "./Automations/GameOfLife";
import Cell from "./Components/Cell/Cell";

import "./CellAutomata.css";

const rows = 50;
const cols = 80;
var generations = 0;
export default class CellAutomata extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
      started: false,
    };
  }

  componentDidMount() {
    const grid = createGrid();
    this.setState({ grid });
  }

  stepGOL = () => {
    const newGrid = gameOfLife(this.state.grid, rows, cols);
    this.setState({ grid: newGrid });
    generations++;
  };

  runGameOfLife = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.stepGOL, 50);
  };

  handlemouseDown(row, col) {
    getNewGrid(this.state.grid, row, col);
    this.setState({ grid: this.state.grid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    // const newGrid = getNewGrid(this.state.grid, row, col);
    // this.setState({ grid: newGrid });
    getNewGrid(this.state.grid, row, col);
    this.setState({ grid: this.state.grid, mouseIsPressed: true });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  stop = () => {
    clearInterval(this.intervalId);
  };

  clear = () => {
    this.componentDidMount();
    this.stop();
  };

  seed = () => {
    const grid = seededGrid();
    this.setState({ grid });
  };

  render() {
    const { grid, mouseIsPressed, started } = this.state;

    return (
      <>
        <br></br>
        <select name="Automation" id="automations">
          <option value="GOL">Game Of Life</option>
        </select>

        <button onClick={() => this.runGameOfLife()}>Start</button>
        <button onClick={() => this.stop()}>Stop</button>
        <button onClick={() => this.clear()}>Clear</button>
        <button onClick={() => this.seed()}>Random Seed</button>

        <div className="grid">
          {grid.map((row, rowInd) => {
            return (
              <div key={rowInd}>
                {row.map((cell, cellInd) => {
                  const { row, col, isAlive } = cell;
                  return (
                    <Cell
                      key={cellInd}
                      col={col}
                      row={row}
                      isAlive={isAlive}
                      mouseIsPressed={mouseIsPressed}
                      started={started}
                      onMouseDown={(row, col) => this.handlemouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                    ></Cell>
                  );
                })}
              </div>
            );
          })}
        </div>
        <h1 id="generations">Generations: {generations}</h1>
      </>
    );
  }
}

const createGrid = () => {
  const grid = [];
  for (let row = 0; row < rows; row++) {
    const currRow = [];
    for (let col = 0; col < cols; col++) {
      currRow.push(createNode(col, row));
    }
    grid.push(currRow);
  }
  return grid;
};

const seededGrid = () => {
  const grid = [];
  for (let row = 0; row < rows; row++) {
    const currRow = [];
    for (let col = 0; col < cols; col++) {
      currRow.push(randomNode(col, row));
    }
    grid.push(currRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isAlive: false,
  };
};

const randomNode = (col, row) => {
  return {
    col,
    row,
    isAlive: Math.random() > 0.5,
  };
};

const getNewGrid = (grid, row, col) => {
  const cell = grid[row][col];
  const newCell = {
    ...cell,
    isAlive: !cell.isAlive,
  };
  grid[row][col] = newCell;
};

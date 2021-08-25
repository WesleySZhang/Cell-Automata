import React, { Component } from "react";
import { gameOfLife } from "./Automations/GameOfLife";
import Cell from "./Components/Cell/Cell";

import "./CellAutomata.css";

const rows = 50;
const cols = 80;

export default class CellAutomata extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
      started: false,
      generations: 0,
      automations: [
        { id: '', name: 'Select Automation' },
        { id: 'GOL', name: 'Game of Life' }

      ],
      automation: ""
    };
  }

  componentDidMount() {
    const grid = createGrid();
    this.setState({ grid });
  }

  stepGOL = () => {
    const newGrid = gameOfLife(this.state.grid, rows, cols);
    this.setState({ grid: newGrid });
    this.setState({ generations: this.state.generations + 1 });
  };

  runGameOfLife = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.stepGOL, 100); //takes a step every 100ms
  };

  handlemouseDown(row, col) {
    getNewGrid(this.state.grid, row, col);
    this.setState({ grid: this.state.grid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    getNewGrid(this.state.grid, row, col);
    this.setState({ grid: this.state.grid, mouseIsPressed: true });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  start = () => {
    var e = document.getElementById("automation"); //gets automation from dropdown list
    var a = e.value;
    this.setState({ automation: a });
    if (a === "GOL") {
      this.runGameOfLife();
    }
  }

  stop = () => {
    clearInterval(this.intervalId);
  };

  clear = () => {
    this.componentDidMount();
    this.stop();
    this.setState({ generations: 0 });
  };

  seed = () => {
    const grid = seededGrid();
    this.setState({ grid });
    this.stop();
    this.setState({ generations: 0 });
  };

  render() {
    const { grid, mouseIsPressed, started, automations } = this.state;

    let automationList = automations.length > 0 && automations.map((item, i) => {
      return (
        <option key={i} value={item.id}>{item.name}</option>
      )
    }, this);

    return (
      <>
        <br></br>
        <select class="dropdown" id="automation">
          {automationList}
        </select>


        <button class="button" onClick={() => this.start()}>Start</button>
        <button class="button" onClick={() => this.stop()}>Stop</button>
        <button class="button" onClick={() => this.clear()}>Clear</button>
        <button class="button" onClick={() => this.seed()}>Random Seed</button>

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
        <br></br>
        <div class="generations"> Generations: {this.state.generations}</div>
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

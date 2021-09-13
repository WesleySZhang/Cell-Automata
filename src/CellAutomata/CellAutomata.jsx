import React, { Component } from "react";
import { gameOfLife } from "./Automations/GameOfLife";
import { briansBrain } from "./Automations/BriansBrain";
import { Seeds } from "./Automations/Seeds";
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
        // { id: '', name: 'Select Automation' },
        { id: 'GOL', name: 'Game of Life' },
        { id: 'BB', name: 'Brian\'s Brain' },
        { id: 'Seeds', name: 'Seeds' },
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

  stepBB = () => {
    const newGrid = briansBrain(this.state.grid, rows, cols);
    this.setState({ grid: newGrid });
    this.setState({ generations: this.state.generations + 1 });
  };

  stepSeeds = () => {
    const newGrid = Seeds(this.state.grid, rows, cols);
    this.setState({ grid: newGrid });
    this.setState({ generations: this.state.generations + 1 });
  };

  runGameOfLife = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.stepGOL, 100); //takes a step every 100ms
  };

  runBriansBrain = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.stepBB, 100); 
  };

  runSeeds = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.stepSeeds, 100); 
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
    var automationType = document.getElementById("automation").value; //gets automation from dropdown list
    this.setState({ automation: automationType });
    if (automationType === 'GOL') {
      this.runGameOfLife();
    }
    else if (automationType === 'BB') {
      this.runBriansBrain();
    }
    else if (automationType === 'Seeds') {
      this.runSeeds();
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
    isAlive: 0,
  };
};

const randomNode = (col, row) => {
  return {
    col,
    row,
    isAlive: Math.round(Math.random()),
  };
};

const getNewGrid = (grid, row, col) => {
  const cell = grid[row][col];
  let newState;
  if(cell.isAlive == 1){
    newState = 0;
  }
  else{
    newState = 1;
  }
  const newCell = {
    ...cell,
    isAlive: newState,
  };
  grid[row][col] = newCell;
};

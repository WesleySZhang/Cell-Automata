import _ from "lodash"
import {countNeighbors} from "./GameOfLife.js"

export function briansBrain(grid, rows, cols){
    let next = _.cloneDeep(grid);
    
    for (let i = 0; i < rows; i++){
        for (let j = 0; j < cols; j++){
            
            const state = grid[i][j].isAlive;
            const neighbors = countNeighbors(grid, i, j, rows, cols);            
            

            if(state==1){
                next[i][j].isAlive = 2;
            }
            else if (state==2){
                next[i][j].isAlive = 0;
            }
            else if (state==0 && neighbors==2){
                next[i][j].isAlive = 1;
            }
        }
    }

    return next;
}
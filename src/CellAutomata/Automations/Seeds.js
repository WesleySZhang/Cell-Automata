import {countNeighbors} from "./GameOfLife.js"
import _ from "lodash"

export function Seeds(grid, rows, cols){
    let next = _.cloneDeep(grid);
    
    for (let i = 0; i < rows; i++){
        for (let j = 0; j < cols; j++){
            
            const state = grid[i][j].isAlive;
            const neighbors = countNeighbors(grid, i, j, rows, cols);            
            

            if(state==0 && neighbors==2){
                next[i][j].isAlive = 1;
            }
            else{
                next[i][j].isAlive = 0;
            }
            
        }
    }

    return next;
}
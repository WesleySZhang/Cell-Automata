import _ from "lodash"

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

function countNeighbors(grid, x, y, rows, cols){
    let sum = 0;
    for (let i = -1; i <= 1; i++){
        for (let j = -1; j<=1; j++){
            //let notCurrent = !(i==0 && j==0);
            let inBounds = ((x+i<rows-1) && (x+i>=0) && (y+j<cols-1) && (y+j>=0));          
            
            if(inBounds){
                // if(grid[(x+i)][(y+j)].isAlive && notCurrent ){
                    if(grid[x+i][y+j].isAlive==1){
                        sum++;
                    }
                // }
            }
        }     
    }

    if(grid[(x)][(y)].isAlive==1){
        sum--;
    }
    
    return sum;
}
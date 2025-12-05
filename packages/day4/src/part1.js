import { readFileSync } from 'node:fs';
import { adjacentPoints } from '../../../utils.js'




function adjacentCnt(x, y, grid){
    const h = grid.length
    const w = grid[0].length
    const adjRolls = adjacentPoints(x, y)
        .filter(([x1, y1]) => x1 >= 0 && x1 < w && y1 >= 0 && y1 < h && grid[y1][x1] == '@' )
    return adjRolls.length

}

function part1(dataFilePath){
    const text = readFileSync(dataFilePath, "utf8");
    const lines = text.split(/\r?\n/)
    const grid = lines.map((line, j) => [...line])

    const rollsPositions = grid.map((row, j) => row.map((c, i) => ({x: i, y: j, c: c})))
        .flat()
        .filter(pos => pos.c == '@')
        .map(pos => [pos.x, pos.y])

    const t = rollsPositions.filter(([x, y]) => adjacentCnt(x, y, grid) < 4)
    return t.length
}

export { part1 }
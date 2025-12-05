import { readFileSync } from 'node:fs';
import { adjacentPoints } from '../../../utils.js'

function adjacentCnt(x, y, grid){
    const h = grid.length
    const w = grid[0].length
    const adjRolls = adjacentPoints(x, y)
        .filter(([x1, y1]) => x1 >= 0 && x1 < w && y1 >= 0 && y1 < h && grid[y1][x1] == '@' )
    return adjRolls.length

}

function rollsToRemove(grid){
     const rollsPositions = grid.map((row, j) => row.map((c, i) => ({x: i, y: j, c: c})))
        .flat()
        .filter(pos => pos.c == '@')
        .map(pos => [pos.x, pos.y])

    return rollsPositions.filter(([x, y]) => adjacentCnt(x, y, grid) < 4)
}

function part2(dataFilePath){
    const text = readFileSync(dataFilePath, "utf8");
    const lines = text.split(/\r?\n/)
    const grid = lines.map((line, j) => [...line])
    let allRemovedCnt = 0
    let toRemove = []
    do{
        toRemove = rollsToRemove(grid)
        toRemove.forEach(([x, y]) => grid[y][x] = '.')
        allRemovedCnt += toRemove.length
    } while (toRemove.length != 0)
    return allRemovedCnt
}

export { part2 }
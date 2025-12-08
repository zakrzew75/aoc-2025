import { readFileSync } from 'node:fs';
import { zip, parseNumbers } from '../../../utils.js'


function part1(dataFilePath){
    const text = readFileSync(dataFilePath, "utf8");
    const grid = text.split(/\r?\n/).map(line => [...line])
    const start = grid[0].indexOf('S')
    let beams = new Set([start])
    let splitCnt = 0
    grid.forEach((line, i) => {
            const prevBeams = beams
            beams = new Set([])
            prevBeams.forEach(beam => {
                if(line[beam] == '^'){
                    splitCnt++
                    beams.add(beam - 1)
                    beams.add(beam + 1)
                } else {
                    beams.add(beam)
                }
            })
            beams.forEach(beam => grid[i][beam] = '|')
    })

    return splitCnt
}

export { part1 }
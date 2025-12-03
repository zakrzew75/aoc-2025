import { readFileSync } from 'node:fs';
import { zip, parseNumbers } from '../../../utils.js'

function part1(dataFilePath){
    const text = readFileSync(dataFilePath, "utf8");
    const lines = text.split(/\r?\n/)
    const rotations = lines.map(s => [s[0], Number(s.slice(1))])
    var dial = 50
    var zeroCount = 0
    rotations.forEach(([dir, n]) => {
        if(dir == 'R'){
            dial = (dial + n)%100
        } else {
            dial = (dial - n)%100
        }
        if(dial == 0){
            zeroCount ++
        }
    })
    return zeroCount
}

export { part1 }
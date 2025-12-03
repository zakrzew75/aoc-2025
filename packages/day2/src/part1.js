import { readFileSync } from 'node:fs';
import { range } from '../../../utils.js'

function isValidId(id){
    const idString = String(id)
    const half = Math.floor(idString.length / 2);
    return idString.slice(0, half) != idString.slice(half)
}

function part1(dataFilePath){
    const text = readFileSync(dataFilePath, "utf8");
    const ranges = text.match(/\d+\-\d+/g)
        .map(s => s.split('-').map(Number))
    return ranges.map(([from, to]) => range(from, to).filter(n => !isValidId(n)).reduce((acc, i) => acc + i, 0))
        .reduce((acc, i) => acc + i, 0)
}

export { part1 }
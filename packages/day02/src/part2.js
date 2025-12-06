import { readFileSync } from 'node:fs';
import { factors, range } from '../../../utils.js'

function isValidId(id){
    const idString = String(id)
    if(idString.length < 2){
        return true
    }
    const fs = factors(idString.length)
    const invalid =  fs.filter(f => 
        idString.slice(0, f)
            .repeat(idString.length / f) === idString
    )
    return invalid.length === 0
}

function part2(dataFilePath){
    const text = readFileSync(dataFilePath, "utf8");
    const ranges = text.match(/\d+\-\d+/g)
        .map(s => s.split('-').map(Number))
    return ranges.map(([from, to]) => range(from, to).filter(n => !isValidId(n)).reduce((acc, i) => acc + i, 0))
        .reduce((acc, i) => acc + i, 0)
}

export { part2 }
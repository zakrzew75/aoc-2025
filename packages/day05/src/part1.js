import { readFileSync } from 'node:fs';
import { zip, parseNumbers } from '../../../utils.js'

function isInRange(n, [from, to]){
    return n >= from && n <= to
}

function isInRanges(n, ranges){
    return ranges.filter(range => isInRange(n, range)).length > 0
}

function part1(dataFilePath){
    const text = readFileSync(dataFilePath, "utf8");
    const lines = text.split(/\r?\n/)
    const emptyLineIndex = lines.indexOf("")
    const ranges = lines.slice(0, emptyLineIndex)
        .map(s => s.split('-').map(Number))
    const ids = lines.slice(emptyLineIndex + 1)
        .map(Number)

    return ids.filter(id => isInRanges(id, ranges)).length
}

export { part1 }
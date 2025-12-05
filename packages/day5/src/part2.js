import { readFileSync } from 'node:fs';
import { mergeRanges } from '../../../utils.js'

function part2(dataFilePath){
    const text = readFileSync(dataFilePath, "utf8");
    const lines = text.split(/\r?\n/)
    const emptyLineIndex = lines.indexOf("")
    return lines.slice(0, emptyLineIndex)
        .map(s => s.split('-').map(Number))
        .sort(([from1, ], [from2, ]) => from1 - from2)
        .reduce((acc, [from, to]) => {
            if(acc.length == 0){
                acc.push([from, to])
            } else {
                mergeRanges(acc.pop(), [from, to])
                    .forEach(m => acc.push(m))
            }
            return acc
        }, [])
        .map(([from, to]) => to - from + 1)
        .reduce((acc, n) => acc + n, 0)
}

export { part2 }
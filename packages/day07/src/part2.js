import { readFileSync } from 'node:fs';

function part2(dataFilePath){
    const text = readFileSync(dataFilePath, "utf8");
    const grid = text.split(/\r?\n/).map(line => [...line])
    const start = grid[0].indexOf('S')
    let beams = new Map()
    beams.set(start, 1)
    let splitCnt = 0
    grid.forEach((line, i) => {
            const prevBeams = beams
            beams = new Map()
            prevBeams.forEach((cnt, beam) => {
                if(line[beam] == '^'){
                    splitCnt += cnt 
                    beams.set(beam + 1, cnt + (beams.has(beam + 1)? beams.get(beam + 1) : 0))
                    beams.set(beam - 1, cnt + (beams.has(beam - 1)? beams.get(beam - 1) : 0))
                } else {
                    beams.set(beam , cnt + (beams.has(beam)? beams.get(beam) : 0))
                }
            })
            beams.forEach((cnt, beam) => grid[i][beam] = String(cnt > 9? 9: cnt))
    })

    return splitCnt + 1
}

export { part2 }
import { readFileSync } from 'node:fs';
import { zip, parseNumbers } from '../../../utils.js'

function distance3D([x1, y1, z1], [x2, y2, z2]){
    return Math.hypot(x1 - x2, y1 - y2, z1 - z2)
}

function findCircuit(circuits, p){
    return circuits.findIndex(circuit=> circuit.has(p))
}

function part2(dataFilePath){
    const text = readFileSync(dataFilePath, "utf8");
    const points = text.split(/\r?\n/)
        .map(s => s.split(',').map(Number))
    let circuits = []    
    const distances = []
    points.forEach((p1, i) => {
        points.forEach((p2, j) => {
            if(j < i){
                const dist = distance3D(p1, p2)
                distances.push([i, j, dist])
            }
        })
    })
    const sorted = distances
            .sort(([,,dist1], [,,dist2 ]) => dist1 - dist2)
    for(const dist of sorted){
        const [p1, p2, ] = dist        
        const circuit1Index = findCircuit(circuits, p1)
        const circuit2Index = findCircuit(circuits, p2)
        if(circuit1Index == -1 && circuit2Index == -1){
            circuits.push(new Set([p1, p2]))
        } else if (circuit1Index != -1 && circuit2Index == -1) {
            circuits[circuit1Index].add(p2)
        } else if (circuit1Index == -1 && circuit2Index != -1) {
            circuits[circuit2Index].add(p1)
        } else if (circuit1Index != circuit2Index) {
            //merge circuits
            circuits[circuit1Index] = circuits[circuit1Index].union(circuits[circuit2Index])
            circuits[circuit2Index] = new Set([])
        } 
        circuits = circuits.filter(s => s.size > 0)
        if(circuits.length == 1 && circuits[0].size == points.length){
            const res = points[p1][0] * points[p2][0]
            return res
        }
    }
    error("solution not found")
}

export { part2 }
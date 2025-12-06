import { readFileSync } from 'node:fs';

function maxJoltage(n, battery){
    if(n == 1){
        return Math.max(...battery);
    }
    const max = Math.max(...battery.slice(0, -(n-1)))
    return max * (10 ** (n -1)) + maxJoltage(n - 1, battery.slice(battery.indexOf(max) + 1))
}

function part2(dataFilePath){
    const text = readFileSync(dataFilePath, "utf8");
    const lines = text.split(/\r?\n/)
    return lines.map(line => [...line].map(Number))
        .map(battery => maxJoltage(12, battery))
        .reduce((acc, maxJoltage) => acc + maxJoltage, 0 )
}

export { part2 }
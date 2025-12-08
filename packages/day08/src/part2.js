import { readFileSync } from 'node:fs';
import { zip, parseNumbers } from '../../../utils.js'

function part2(dataFilePath){
    const text = readFileSync(dataFilePath, "utf8");
    const lines = text.split(/\r?\n/)
  
}

export { part2 }
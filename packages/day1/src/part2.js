import { readFileSync } from 'node:fs';
import { zip, parseNumbers } from '../../../utils.js'

function part2(dataFilePath){
    const text = readFileSync(dataFilePath, "utf8");
    const lines = text.split(/\r?\n/)
    const rotations = lines.map(s => [s[0], Number(s.slice(1))])
    const safe = {
        dial: 50,
        zeroCount: 0,
        turnLeft() {
            this.dial--
                if(this.dial == 0){
                    this.zeroCount++
                }
                if(this.dial == -1){
                    this.dial = 99
                }
        },
        turnRight(){
            this.dial++
                if(this.dial == 100){
                    this.dial = 0
                }
                if(this.dial == 0 ){
                    this.zeroCount++
                }
        }
    }
    rotations.forEach(([dir, n]) => {
        //console.log("%s %d dial: %d, cnt: %zeroCount", dir, n, dial, zeroCount)
        if(dir == 'R'){
            for(let i = 0; i < n; i++){
                safe.turnRight()
            }
        } else {
            for(let i = 0; i < n; i++){
                safe.turnLeft()
            }
        }
    })
    return safe.zeroCount

}

export { part2 }
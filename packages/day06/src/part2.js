import { readFileSync } from 'node:fs';
import { transpose, parseNumbers } from '../../../utils.js'


function solve(problem){
    const operand = problem.pop()
    const operations = {
        '+': (a, b) => a + b,
        '*': (a, b) => a * b
    }
    const initial = {
        '+': 0,
        '*': 1
    }
    return problem.reduce(operations[operand], initial[operand])
}

function part2(dataFilePath){
    const text = readFileSync(dataFilePath, "utf8");
    const lines = text.split(/\r?\n/)
        .map(line => [...line])
    const transposed = transpose(lines)
    const problems = [[]]
    transposed.forEach(row => {
        if(row.every(c => c == ' ')){
            problems.push([])
        } else {
            problems[problems.length - 1].push(row)
        }
    })
    return problems.map(problem => {
            const operand = problem[0].pop()
            const args = problem.map(arg => arg.join('').trim())
                .map(Number)
            args.push(operand)
            return args
        })
        .map(problem => solve(problem))
        .reduce((acc, n) => acc + n, 0);
}

export { part2 }
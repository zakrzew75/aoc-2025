import { readFileSync } from 'node:fs';
import { transpose, parseNumbers } from '../../../utils.js'

function solve(problem){
    const operand = problem.pop()
    const args = problem.map(Number)
        const operations = {
        '+': (a, b) => a + b,
        '*': (a, b) => a * b
    }
    const initial = {
        '+': 0,
        '*': 1
    }
    return args.reduce(operations[operand], initial[operand])
}

function part1(dataFilePath){
    const text = readFileSync(dataFilePath, "utf8");
    const lines = text.split(/\r?\n/)
        .map(line => line.trim().split(/\s+/))
    const transposed = transpose(lines)
    return transposed.map(problem => solve(problem))
        .reduce((acc, n) => acc + n, 0)
}

export { part1 }
import { test } from 'node:test'
import assert from "node:assert";
import { part1 } from '../src/part1.js';
import { part2 } from '../src/part2.js';

test('part 1 test', () => {
    assert.equal(part1("data/test.txt"), 0)
})

test('part 2 test', () => {
    assert.equal(part2("data/test.txt"), 0)
})
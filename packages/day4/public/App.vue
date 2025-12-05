<template>
<table>
  <tbody>
    <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
      <td v-for="(cell, colIndex) in row" :key="colIndex">
        {{ cell }}
      </td>
    </tr>
  </tbody>
</table>
<button @click="loadTest">test</button>
<button @click="loadTask">start</button>
<button @click="move">move</button>
</template>
<script setup>
  import { ref } from 'vue'

  const message = ref('Hello vue!')
  const rows = ref([[], []])

  function wait(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  function adjacentPoints(x, y){
    return [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]]
        .map(([x0, y0]) => [x + x0, y + y0])
  }

  function adjacentCnt(x, y, grid){
      const h = grid.length
      const w = grid[0].length
      const adjRolls = adjacentPoints(x, y)
          .filter(([x1, y1]) => x1 >= 0 && x1 < w && y1 >= 0 && y1 < h && grid[y1][x1] == '@' )
      return adjRolls.length

  }

  function rollsToRemove(grid){
      const rollsPositions = grid.map((row, j) => row.map((c, i) => ({x: i, y: j, c: c})))
          .flat()
          .filter(pos => pos.c == '@')
          .map(pos => [pos.x, pos.y])

      return rollsPositions.filter(([x, y]) => adjacentCnt(x, y, grid) < 4)
  }

  async function move(){
    let allRemovedCnt = 0
    let toRemove = []
    do{
        toRemove = rollsToRemove(rows.value)
        toRemove.forEach(([x, y]) => rows.value[y][x] = '.')
        allRemovedCnt += toRemove.length
        await wait(300)
    } while (toRemove.length != 0)
  }

  async function loadTest(){
    start("./data/test.txt")
  }

  async function loadTask(){
    start("./data/data.txt")
  }

  async function start(dataSource){
      const res = await fetch(dataSource)
      const text = await res.text()
      const lines = text.split(/\r?\n/)
      const grid = lines.map((line, j) => [...line])
      console.log(text)
      rows.value = grid
  }
</script>

<style scoped>

  td {
    text-align: center;
    color:darkblue;
    font-size: x-small;
  }
</style>
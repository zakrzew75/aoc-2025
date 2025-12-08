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

  async function move(){
      const start = rows.value[0].indexOf('S')
      let beams = new Set([start])
      console.log(beams)
      for(let i = 0; i < rows.value.length; i++){
        const line = rows.value[i]
        console.log(line)
        console.log(i)
        const prevBeams = beams
        beams = new Set([])
        prevBeams.forEach(beam => {
            if(line[beam] == '^'){
                beams.add(beam - 1)
                beams.add(beam + 1)
            } else {
                beams.add(beam)
            }
        })
        beams.forEach(beam => {
          console.log("update grid")
          console.log(beam)
          console.log(i)
          rows.value[i][beam] = '|'
        })
        await wait(500)
      }
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
      const grid = text.split(/\r?\n/).map(line => [...line])
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
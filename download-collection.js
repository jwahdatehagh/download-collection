import fs from 'fs'
import fetch from 'node-fetch'

const [ URL, START, END ] = process.argv.slice(2)

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const collection = []

let id = parseInt(START)
const last = parseInt(END);
(async () => {
  while (id <= last) {
    try {
      let i = id
      const result = await fetch(`${URL}/${i}`)
      collection.push(await result.json())
      console.info(`Fetched token #${i}`)
      await delay(10)
      id ++
    } catch (e) {
      console.warn(e.message)
    }
  }
  fs.writeFileSync('collection.json', JSON.stringify(collection, null, 4))
})()

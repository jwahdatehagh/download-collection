import fs from 'fs'
import fetch from 'node-fetch'

const [ URL ] = process.argv.slice(2)

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const collection = []

let id = 1;
(async () => {
  while (true) {
    try {
      let i = id
      const result = await fetch(`${URL}/${i}`)
      collection.push(await result.json())
      console.info(`Fetched token #${i}`)
      await delay(10)
      id ++
    } catch (e) {
      console.warn(e.message)
      console.warn(`Fetch for token #${id} failed. Stopping execution and saving collection`)
      fs.writeFileSync('collection.json', JSON.stringify(collection, null, 4))
    }
  }
})()

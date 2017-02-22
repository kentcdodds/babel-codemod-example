import fs, {readFile} from 'fs'
import {resolve} from 'path'
import cp from 'child_process'

resolve(__dirname, './thing')

readFile('./thing.js', 'utf8', (err, string) => {
  console.log(string)
})

fs.readFile('./other-thing', 'utf8', (err, string) => {
  const resolve = string => string
  console.log(resolve())
})

cp.execSync('echo "hi"')

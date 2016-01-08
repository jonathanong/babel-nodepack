import { resolve } from 'path'
import { readFileSync } from 'fs'

export default JSON.parse(readFileSync(resolve('package.json'), 'utf8'))

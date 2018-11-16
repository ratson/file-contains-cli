'use strict'

const fse = require('fs-extra')
const glob = require('fast-glob')

module.exports = async ({ filePatterns, stringOrRegex, invert }) => {
  const filePaths = await glob(filePatterns)
  await Promise.all(
    filePaths.map(async p => {
      const content = await fse.readFile(p, 'utf8')
      if (!invert && content.indexOf(stringOrRegex) === -1) {
        throw new Error(`file ${p} not contains ${stringOrRegex}`)
      }
      if (invert && content.indexOf(stringOrRegex) > -1) {
        throw new Error(`file ${p} contains ${stringOrRegex}`)
      }
    }),
  )
}

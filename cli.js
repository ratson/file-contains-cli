#!/usr/bin/env node
'use strict'

require('make-promises-safe')
const yargs = require('yargs')

const check = require('.')

async function main() {
  const { argv } = yargs
    .command('$0 <files...>', 'Check if file contains a string')
    .option('s', {
      type: 'string',
      desc: 'string to check',
    })
    .option('invert', {
      default: false,
      alias: 'I',
    })

  await check({
    filePatterns: argv.files,
    stringOrRegex: argv.s,
    invert: argv.invert,
  })
}

main()

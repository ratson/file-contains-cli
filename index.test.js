'use strict'

const execa = require('execa')

const binPath = require.resolve('./cli.js')

test('exit 0 when file contains string', async () => {
  const { code } = await execa(
    binPath,
    ['-s', 'file-contains-cli', 'package.json'],
    { reject: false },
  )
  expect(code).toBe(0)
})

test('exit 1 when file not contains string', async () => {
  const { code } = await execa(binPath, ['-s', 'not-found', 'package.json'], {
    reject: false,
  })
  expect(code).toBe(1)
})

test('exit 1 when file contains string with --invert', async () => {
  const { code } = await execa(
    binPath,
    ['-s', 'file-contains-cli', '--invert', 'package.json'],
    { reject: false },
  )
  expect(code).toBe(1)
})
